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
    lastMessage: { Sender: string, Message: string, Time: number }
    newMessages: boolean;
}

export default function ChatList(props: IChat) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<string>("");

    const ws = new WebSocket(`${process.env.REACT_APP_CHAT_CREATE_ENDPOINT}${props.receiverEmail}`);

    ws.onopen = () => {
        conversations.forEach((conversation) =>
        ws.send(JSON.stringify({
            options: "subscribe",
            message: "subscribe",
            destination: conversation.id,
        }))
        )
    };

    ws.onmessage = (event) => {
        const idPattern = /^[0-9a-fA-F]{24}$/;

        if (!idPattern.test(event.data)) {
            const message = JSON.parse(event.data);
            const newLastMessage = {
                Sender: message.sender,
                Message: message.message,
                Time: Date.now()
            }
            const updatedConversations = conversations.map((conversation) => {
                if (conversation.id === message.destination) {
                    return {
                        ...conversation,
                        newMessages: true,
                        lastMessage: newLastMessage
                    }
                }
                return conversation;
            })

            setConversations(updatedConversations);
        }
    }

    const fetchConversations = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_CHAT_CONVERSATIONS_ENDPOINT}${props.receiverEmail}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            })
            console.log(response)
            if (response.ok) {
                const res = await response.json()
                if (res?.status === 200) {
                    const conversationsWithPictures = await Promise.all(res.data?.data?.rooms.map(async (room: any) => {
                        const profilePicture = await fetchUsersProfilePicture(room.email);
                        const lastMessage = await fetchLastMessage(room.id);
                        return {
                            email: room.email,
                            id: room.id,
                            profilePicture: profilePicture,
                            lastMessage: {
                                Sender: lastMessage.Sender,
                                Message: lastMessage.Message,
                                Time: lastMessage.Time ? lastMessage.Time*1000 : ""
                            },
                            }
                        }
                    ));
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
        setConversations(conversations.map((conversation) => {
            return {
                ...conversation,
                newMessages: false
            }
        }))
    }

    const fetchUsersProfilePicture = async (email: string) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profiles/user/${email}`, {
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
            const response = await fetch(`http://${process.env.REACT_APP_CHAT_HISTORY_ENDPOINT}${roomId}/${props.receiverEmail}/0`, {
                credentials: "include",
            });
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
                                setConversations(conversations.map((conversation) => {
                                        return {
                                            ...conversation,
                                            newMessages: false
                                        }
                                }))
                            }}>
                                <div className="border-neutral-500 border-2 h-[75px] flex items-center mb-2 rounded-md">
                                    <LazyLoadImage
                                        src={conversation.profilePicture}
                                        alt="receiverPicture"
                                        className="w-14 h-14 rounded-full ml-3"
                                        effect="blur"
                                    />
                                    <div className="flex flex-col ml-3 text-left">
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-lg">{conversation.email}{conversation.newMessages && (
                                                <span
                                                    className="text-left bg-red-500 text-white rounded-full px-2 py-[2px] text-xs ml-2">New</span>
                                            )}</p>

                                        </div>
                                        <p className="ml-2 text-teal-600">
                                            {conversation.lastMessage.Message
                                                ? conversation.lastMessage.Message.toString().length > 132
                                                    ? conversation.lastMessage.Message.substring(0, 132) + "..."
                                                    : conversation.lastMessage.Message
                                                : "No messages yet ..."}
                                            {conversation.lastMessage.Time && (
                                                <span className="text-xs text-gray-500 ml-2">
                                                    {new Date(conversation.lastMessage.Time).toLocaleString()}
                                                </span>
                                            )}
                                        </p>
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