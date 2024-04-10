"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface pageContentProps{
    songs: Song[];
};

const PageContent:React.FC<pageContentProps> = ({
    songs,
}) => {
    const onPlay = useOnPlay(songs);
    if(songs.length === 0) // if we use songs.length an issue occurs[ Caused as Any props we pass to our components will be given as properties of that object ]. Solution - https://stackoverflow.com/questions/75952744/property-map-does-not-exist-on-type-menuitemsprops-ts2339
    {
        return (
            <div className="mt-4 text-neutral-400">
                No Songs Available!!
            </div>
        );
    }

    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
            "
        >
            {/* Page Content */}
            {songs.map((item)=>(  // if we use songs.map an issue occurs[ Caused as Any props we pass to our components will be given as properties of that object ]. Solution -  https://stackoverflow.com/questions/75952744/property-map-does-not-exist-on-type-menuitemsprops-ts2339
                <SongItem 
                    key={item.id}
                    onClick={(id: string)=> onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
};

export default PageContent;