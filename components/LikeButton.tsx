"use client";

import UseAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface likeButtonProps{
    songId: string;
};

const LikeButton:React.FC<likeButtonProps> = ({
    songId
}) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModal = UseAuthModal();
    const { user } = useUser();
    const [ isLiked, setIsLiked ] = useState(false);

    useEffect(() => {
        if(!user?.id)
            return;

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id',songId)
                .single();
            
            if(!error && data)
                setIsLiked(true);
        };

        fetchData();
    },[songId, supabaseClient, user?.id]);

    const Icon = isLiked ? AiFillHeart: AiOutlineHeart;

    const handleLike = async () => {
        if(!user) // Ensures that the user is logged in. If not logged in it opens the Sign In form
            return authModal.onOpen(); 

        if(isLiked)
        {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id',songId);

            if(error)
            {
                console.log(error.message);
                toast.error(error.message);
            }
            else
                setIsLiked(false);
        }
        else
        {
            const { error } = await supabaseClient
                .from('liked_songs')
                .insert({
                    song_id: songId,
                    user_id: user.id
                });

            if(error)
            {
                console.log(error.message);
                toast.error(error.message);
            }
            else
            {
                setIsLiked(true);
                console.log(`Liked the song with id-${songId}`);
                toast.success('Liked!!');
            }
        }

        router.refresh();
    };

    return (
        <button
            onClick={handleLike}
            className="
                hover: opacity-75
                transition
            "
        >
            <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
        </button>
    );
};

export default LikeButton;