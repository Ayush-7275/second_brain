import { cva } from "class-variance-authority";

interface ButtonProp {
    intent?: "primary" | "secondry";
    size?: "lg" | "md" | "sm" | "fullWidth";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick?: () => void;
}

const buttonVariants = cva(
    ["rounded-md", "flex", "items-center",'transition-all'],
    {
        variants: {
            intent: {
                primary: ["bg-[#5046E4]", "text-white",'hover:bg-[#110a71]'],
                secondry: ["bg-[#E0E7FF]", "text-[#5046E4]",'hover:bg-[#c5cce1]'],
            },
            size: {
                sm: ["text-sm", "px-1.5", "py-1",'hover:translate-y-0.5'],
                md: ["text-base", "px-3", "py-1.5",'hov','hover:translate-y-0.5'],
                lg: ["text-xl", "px-5", "py-2",'hover:translate-y-0.5'],
                fullWidth: ["text-base", "py-1.5",'hov','hover:translate-y-0.5','w-full'],

            },
        },
        defaultVariants: {
            intent: "primary",
            size: "md",
        },
    }
);

export const Button = (props: ButtonProp) => {
    return (
        <>
            <div>
                <button
                onClick={props.onClick}
                    className={`${buttonVariants({
                        intent: props.intent,
                        size: props.size,
                    })} ${"flex items-center justify-center"}`}
                >
                    {props.startIcon && (<span className="pr-2 flex items-center">{props.startIcon}</span>)}
                    {props.text}
                    {props.endIcon && (<span className="pl-2 flex items-center">{props.endIcon}</span>)}
                </button>
            </div>
        </>
    );
};
