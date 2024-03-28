import React, {useEffect, useState} from "react";
import ChatPopup from "./ChatPopup";
import Modal from "react-modal";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface IChat {
    receiverEmail: string;
}

interface Conversation {
    email: string;
    id: string;
    profilePicture: string;
    lastMessage: { Sender: string, Message: string, Time: string }
}

export default function ChatList(props: IChat) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<string>("");

    const fetchConversations = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_CHAT_CONVERSATIONS_ENDPOINT}${props.receiverEmail}`);
            if (response.ok) {
                const res = await response.json()
                if (res?.status === 200 && res?.message === "ok") {
                    const conversationsWithPictures = await Promise.all(res.data?.data?.rooms.map(async (room: any) => {
                        const profilePicture = await fetchUsersProfilePicture(room.email);
                        const lastMessage = await fetchLastMessage(room.id);
                        return {
                            email: room.email,
                            id: room.id,
                            profilePicture: profilePicture,
                            lastMessage: lastMessage
                        }
                    }));
                    setConversations(conversationsWithPictures);
                }
            }
        } catch (e) {
            console.error("Error loading chat data:", e);
        }
    }

    useEffect(() => {
        fetchConversations()
        // eslint-disable-next-line
    }, []);

    const handleModal = () => {
        setSelectedConversation("");
    }

    const fetchUsersProfilePicture = async (email: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PROFILE_EMAIL_ENDPOINT}${email}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                const res = await response.json();
                if (res?.status === 200 && res?.message === "ok") {
                    return res.data?.data.profile_image;
                }
            } else {
                if (response.status === 500) {
                    return "https://pbs.twimg.com/profile_images/1151437589062266880/AuZyoH2__400x400.jpg";
                }
            }
        } catch (e) {
            console.error("Error loading chat data:", e);
        }
    }

    const fetchLastMessage = async (roomId: string) => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_CHAT_HISTORY_ENDPOINT}${roomId}/${props.receiverEmail}/0`);
            if (response.status === 302) {
                const res = await response.json();
                if(res.data.data === null){
                    return {Sender: "", Message: "", Time: ""}
                }
                return (res.data.data[0].messages);
            }
        } catch (e) {
            console.error("Error loading chat data:", e);
        }
    }
    return (
        <div className="h-[60vh] w-[60%] m-auto">
            <div className="flex flex-col">
                {conversations.map((conversation) => {
                        return (
                            <button key={conversation.id} onClick={() => {
                                setSelectedConversation(conversation.email)
                            }}>
                                <div className="border-neutral-500 border-2 h-[75px] flex items-center mb-2 rounded-md">
                                    <LazyLoadImage
                                        src={conversation.profilePicture}
                                        alt="receiverPicture"
                                        className="w-14 h-14 rounded-full ml-3"
                                        effect="blur"
                                    />
                                    <div className="flex flex-col ml-3 text-left">
                                        <p className="font-semibold text-lg">{conversation.email}</p>
                                        <p className="ml-2 text-teal-600">{conversation.lastMessage.Message ? (conversation.lastMessage.Message.toString().length > 132) ?
                                            conversation.lastMessage.Message.substring(0, 132) + "..." : conversation.lastMessage.Message
                                            : "No messages yet ..."}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    }
                )}
            </div>
            <Modal isOpen={selectedConversation !== ""} appElement={document.getElementById('root') as HTMLElement}
                   style={{
                       overlay: {
                           backgroundColor: 'rgba(0, 0, 0, 0.25)'
                       },
                       content: {
                           top: '50%',
                           left: '50%',
                           right: 'auto',
                           bottom: 'auto',
                           marginRight: '-50%',
                           transform: 'translate(-50%, -50%)',
                           width: '60%',
                           height: '80%',
                           borderRadius: '30px',
                           paddingTop: '8px'
                       }

                   }}>
                <button
                    className="px-4 py-2 bg-red-400 text-white rounded focus:outline-none hover:bg-red-500 transition duration-300 absolute top-4 right-4 backdrop-blur-0"
                    onClick={handleModal}
                >X
                </button>
                {selectedConversation !== "" && <ChatPopup receiverEmail={selectedConversation}/>}
            </Modal>
        </div>
    );
}