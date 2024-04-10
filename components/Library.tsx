"use client";

import {TbPlaylist} from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import UseAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import UseUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface libraryProps {
    songs: Song[];
};

const Library:React.FC<libraryProps> = ({
    songs
}) => {
    const authModal = UseAuthModal();
    const { user } = useUser();
    const uploadModal = UseUploadModal();
    const onPlay = useOnPlay(songs);

    const onClick=()=>{
        // Handle upload of songs if not logged in
        if(!user)
            return authModal.onOpen();

        // Todo: Check for Subscription

        return uploadModal.onOpen();
    };
    return (
        <div className="flex flex-col">
            {/*Library!!!*/}
            <div 
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                "
            >
                <div 
                    className="
                        inline-flex
                        items-center
                        gap-x-2
                    "
                >
                    <TbPlaylist className="text-neutral-400" size={26}/>
                    <p className="
                        text-neutral-400
                        font-medium
                        text-md
                    ">
                        Your Library
                    </p>
                </div>
                {/* For the Plus icon, next to the Your Library option*/}
                <AiOutlinePlus 
                    onClick={onClick}
                    size={20}
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                />
            </div>
            <div className="
                flex
                flex-col
                gap-y-2
                mt-4
                px-3
            ">
                {/* List of Songs */}
                {songs.map((item) => (
                    <MediaItem 
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;