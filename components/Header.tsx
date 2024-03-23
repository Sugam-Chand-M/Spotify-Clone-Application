"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge"; // https://www.npmjs.com/package/tailwind-merge
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import UseAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast/headless";

interface headerProps{
    children: React.ReactNode;
    className?:string;
};

const Header:React.FC<headerProps> = ({
    children,
    className,
}) => {
    const authModal= UseAuthModal();
    const router=useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const handleLogout = async () => {
        // Handle Logout feature
        const { error } = await supabaseClient.auth.signOut();
        // Todo: To reset any playing songs
        router.refresh();
        if(error)
        {
            console.log(error);
            toast.error(error.message);
        }
        else
        {
            console.log('Logged Out!!');
            toast.success('Logged Out!!');
            
        }
    };
    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
        `,className)}>
            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                ">
                    <button 
                        onClick={()=>router.back()}
                        className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretLeft className="text-white" size={35}/>
                    </button>
                    <button
                        onClick={()=>router.forward()} 
                        className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretRight className="text-white" size={35}/>
                    </button>
                </div>
                {/* This is basically for mobile view, to make the sidebar dissapear */}
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="
                        rounded-full
                        p-2
                        bg-white
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button className="
                        rounded-full
                        p-2
                        bg-white
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-x-4
                ">
                    {user ? ( // For the User Logged In part
                        <div
                            className="
                                flex
                                gap-x-4
                                items-center
                            "
                        >
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                LOGOUT
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button 
                                    onClick={authModal.onOpen} // When we click on Sign Up it opens the form for signing in 
                                    className="
                                    bg-transparent
                                    text-neutral-300
                                    font-medium
                                ">
                                    SIGN UP
                                </Button>
                            </div>
                            <div>
                                <Button 
                                    onClick={authModal.onOpen}
                                    className="
                                    bg-white
                                    px-6
                                    py-2
                                ">
                                    LOG IN
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;