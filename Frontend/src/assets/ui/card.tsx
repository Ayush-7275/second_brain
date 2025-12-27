import { DeleteIcon } from "../icons/DeleteIcon";

interface CardProps {
    title: string;
    content: any; // Changed from 'any'
}

export const Card = ({ title, content }: CardProps) => {
    return (
        <div className="rounded-xl shadow-xl p-3 border border-gray-200 bg-white flex flex-col w-72 h-80">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                <p className="font-semibold text-gray-700">{title}</p>
                <span className="text-gray-500 hover:text-red-500 cursor-pointer">
                    <DeleteIcon size="sm" />
                </span>
            </div>
            
            {/* Content Body */}
            <div className="w-full overflow-hidden">
                {content}
            </div>
        </div>
    );
};