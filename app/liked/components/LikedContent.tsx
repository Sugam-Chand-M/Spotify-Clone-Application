"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface likedContentProps{
    songs: Song[];
};

const LikedContent:React.FC<likedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    useEffect(() => {
        if(!isLoading && !user)
            router.replace('/');
    },[isLoading, user, router]);

    if(songs.length === 0)
    {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-600
                "
            >
                No Liked Songs
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {/* Liked Content */}
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={() => {}}
                            data={song}
                        />
                    </div>
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    );
};

export default LikedContent;