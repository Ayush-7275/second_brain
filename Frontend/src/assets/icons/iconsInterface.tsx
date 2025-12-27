import { cva } from "class-variance-authority";

export interface IconInterface  {
    size : 'sm'|'md'|'lg';
}

export const IconVariants = cva([],{
    variants:{
        size : {
            sm: "size-4",
            md: "size-5",
            lg: 'size-6'
        }
    }
})