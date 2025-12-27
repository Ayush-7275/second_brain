import type { ReactElement } from "react";
import { LogoIcon } from "../icons/LogoIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";

interface SidebarProps {
    title: string;
    logo: ReactElement;
}

export const Sidebar = ({ title }: SidebarProps) => {
    return (
        <>
            <div className="min-h-screen min-w-2/12   bg-gray-400 p-3 rounded-r-xl">
                {/* top logo and title*/}
                <div className="flex justify-between pb-1 mb-2 border-b">
                    <span className="text-[#5343E1]">
                        <LogoIcon size="lg" />
                    </span>
                    <p className="text-xl font-bold">{title}</p>
                </div>
                {/* sidebar items */}
                <div>
                    <SidebarItems
                        logo={<YoutubeIcon size="md" />}
                        text="Youtube"
                    />
                    <SidebarItems logo={<TwitterIcon />} text="Tweets" />
                </div>
            </div>
        </>
    );
};

interface SidebarItemsProps {
    logo: ReactElement;
    text: string;
}

const SidebarItems = ({ logo, text }: SidebarItemsProps) => {
    return (
        <>
            <div className="flex gap-2 items-center p-2 hover:bg-gray-500 rounded-xl">
                {logo}
                <p>{text}</p>
            </div>
        </>
    );
};
