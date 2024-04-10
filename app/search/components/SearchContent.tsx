"use client";

import MediaItem from "@/components/MediaItem";
import { Song } from "@/types";
import React from "react";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface searchContentProps{
    songs: Song[];
};

const SearchContent:React.FC<searchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);
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
                    text-neutral-400
                "
            >
                No Songs Found :(
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem 
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    {/* Todo - Like Button Implementation */}
                    <LikeButton songId={song.id}/>
                </div>
            ))}
        </div>
    );
};

export default SearchContent;