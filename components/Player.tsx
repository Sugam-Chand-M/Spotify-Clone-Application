"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

interface playerProps{};

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId)
        return null;

    return (
        <div
            className="
                fixed
                bottom-0
                bg-black
                w-full
                py-2
                h-[80px]
                px-4
            "
        >
            {/* Player Functionality */}
            <PlayerContent 
                key={songUrl} // when some changes happen the complete playercontent is destroyed. If not used this it might lead to overlaps or the songs might not get played
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
};

export default Player;