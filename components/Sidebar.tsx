"use client"; // for the sidebar to be dynamic
import { usePathname } from "next/navigation"; // https://nextjs.org/docs/app/api-reference/functions/use-pathname
import { useMemo } from "react"; // https://react.dev/reference/react/useMemo
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";

interface sidebarProps{
    children: React.ReactNode;
}

const Sidebar:React.FC<sidebarProps> = ({ // Always capitalise the starting Letter of the the items being exported as Typescript will yell at the small letter [https://stackoverflow.com/questions/37414304/typescript-complains-property-does-not-exist-on-type-jsx-intrinsicelements-whe]
    children // to extract the children
}) => {
    const pathname=usePathname(); // hook for sidebarProps
    // creating an array of routes for multiple components
    const routes=useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !=='/search', // To be active all the time when not on the 'Search' component
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        }
    ],[pathname]);

    return (
        <div className="flex h-full">
            <div 
                className="
                hidden
                md:flex
                flex-col
                gap-y-2
                bg-black
                h-full
                w-[300px]
                p-2
                "
            >
                <Box>
                    <div className="
                        flex
                        flex-col
                        gap-y-4
                        px-5
                        py-4
                    ">
                        {routes.map((item)=>(
                            <SidebarItem 
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </Box>
                
                <Box classname="overflow-y-auto h-full">
                    {/*Song Library*/}
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;