import {twMerge} from "tailwind-merge";
interface boxProps{
    children: React.ReactNode;
    classname?: string;
}

const Box: React.FC<boxProps> = ({
    children,
    classname
}) => {
    return (
        <div className={twMerge(`
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
        `,classname)}>
            {children}
        </div>
    );
};

export default Box;