import { Button } from "./Button";
import { useModalStore } from "../../store/modalStore";
import { useRef, useState } from "react";
import { api } from "../../lib/axios";

export interface Content {
    _id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter";
}

export const Modal = () => {
    const [Type, setType] = useState<null | string>(null);
    const Modal = useModalStore((state) => state.modal);
    const closeModal = useModalStore((state) => state.closeModal);

    const contentTitle = useRef<HTMLInputElement | null>(null);
    const contentLink = useRef<HTMLInputElement | null>(null);

    const contentAdder = async () => {
        try {
            await api.post(
                "/content",
                {
                    title: contentTitle.current?.value,
                    link: contentLink.current?.value,
                    type: Type,
                },
                {
                    headers: {
                        token: localStorage.getItem("token") || "",
                    },
                }
            );
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data);
            }
        }


    };

    return (
        <>
            {Modal && (
                <div
                    className="min-h-screen min-w-screen flex items-center justify-center absolute bg-black/60
"
                >
                    <div className="p-4 bg-white rounded-xl flex flex-col gap-3 items-center">
                        <span className="flex items-center gap-15">
                            <p>Add Content</p>
                            <button
                                className="rounded-2xl hover:bg-gray-200"
                                onClick={(): void => {
                                    closeModal();
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="red"
                                    className="size-6 rounded-2xl hover:bg-gray-200"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </span>
                        <input
                            type="text"
                            className="outline-1 rounded-xl p-2"
                            placeholder="Enter Title"
                            ref={contentTitle}
                        />
                        <input
                            type="text"
                            className="outline-1 rounded-xl p-2"
                            placeholder="Enter the link"
                            ref={contentLink}
                        />

                        <span className="flex gap-2 p-1">
                            <Button
                                size="sm"
                                text="Youtube"
                                intent={
                                    Type === "youtube" ? "primary" : "secondry"
                                }
                                onClick={() => setType("youtube")}
                            />
                            <Button
                                size="sm"
                                text="Twitter"
                                intent={
                                    Type === "youtube" ? "secondry" : "primary"
                                }
                                onClick={() => setType("twitter")}
                            />
                        </span>

                        <Button
                            size="md"
                            intent="primary"
                            text="Submit"
                            onClick={contentAdder}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
