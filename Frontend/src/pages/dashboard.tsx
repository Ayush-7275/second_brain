import { LogoIcon } from "../assets/icons/LogoIcon";
import { PlusIcon } from "../assets/icons/PlusIcon";
import { Shareicon } from "../assets/icons/Shareicon";
import { Button } from "../assets/ui/Button";
import { Card } from "../assets/ui/card";
import { Modal, type Content } from "../assets/ui/modal";
import { Sidebar } from "../assets/ui/Sidebar";
import { Tweet } from "react-tweet";
import { useModalStore } from "../store/modalStore";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";

export const Dashboard = () => {
    const openModal = useModalStore((state) => state.openModal);
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await api.get("/content", {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });

                setContents(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return (
        <>
            <div className="min-h-screen w-full bg-gray-200 flex">
                <Sidebar logo={<LogoIcon size="lg" />} title="Second Brain" />
                <main className="flex-1 p-2">
                    {/* top section with buttons */}
                    <div className="flex justify-between items-center p-2">
                        <p className="text-xl font-semibold">All Notes</p>
                        {/* buttons div */}
                        <div className="flex gap-2">
                            <Button
                                text="Add Content"
                                intent="primary"
                                startIcon={<PlusIcon size="md" />}
                                onClick={openModal}
                            />
                            <Button
                                text="Share Button"
                                intent="secondry"
                                startIcon={<Shareicon size="md" />}
                            />
                        </div>
                    </div>
                    {/* Cards */}
                    <div className="flex flex-wrap gap-2">
                        {loading && <p>Loading...</p>}

                        {!loading &&
                            contents.map((item) => (
                                <Card
                                    key={item._id}
                                    title={item.title}
                                    content={
                                        item.type === "youtube" ? (
                                            <div className="w-full aspect-video rounded-md overflow-hidden">
                                                <iframe
                                                    className="w-full h-full"
                                                    src={item.link.replace(
                                                        "youtu.be/",
                                                        "www.youtube.com/embed/"
                                                    )}
                                                    title="YouTube video player"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                />
                                            </div>
                                        ) : (
                                            <Tweet
                                                id={item.link.split("/").pop()!}
                                            />
                                        )
                                    }
                                />
                            ))}
                    </div>
                </main>

                <Modal />
            </div>
        </>
    );
};
