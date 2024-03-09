"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface listItemProps{
    image: string;
    name: string;
    href: string;
};

const ListItem:React.FC<listItemProps> = ({
    image,
    name,
    href,
}) =>{
    const router = useRouter();
    const onClick = () => {
        // Add authentication before push
        router.push(href);
    };
    return (
        <button
            onClick={onClick} 
            className="
            relative
            group
            flex
            items-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-100/20
            hover:bg-neutral-100/20
            transition
            pr-4
        ">
            <div className="
                relative
                min-h-[64px]
                min-w-[64px]
            ">
                <Image 
                    className="object-cover"
                    fill
                    src={image}
                    alt="Image"
                />
            </div>
            <p className="
                font-medium
                truncate
                py-5
            ">
                {name}
            </p>
            {/* This is for the play button that appears when we hover next to the Liked Songs text in the button */}
            <div className="
                absolute
                transition
                opacity-0
                rounded-full
                flex
                items-center
                justify-center
                bg-green-500
                p-4
                drop-shadow-md
                right-5
                group-hover:opacity-100
                hover:scale-x-110
            ">
                <FaPlay className="text-black"/>
            </div>
        </button>
    );
};

export default ListItem;