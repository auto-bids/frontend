import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


interface NewMessages {
    sender: string;
    message: string;
    date: Date;
}

export default function ChatListener() {
    const [conversations, setConversations] = useState([]);
    const [email, setEmail] = useState("");
    const [newMessages, setNewMessages] = useState<NewMessages[]>([]);
    const [ws, setWs] = useState<WebSocket>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                    },
                });
                if (response.ok) {
                    if (response.status === 200) {
                        const profileData = await response.json();
                        setEmail(profileData.data.data.email);
                    }
                }
            } catch (e) {
                console.error("Error loading chat data:", e);
            }
        };

        fetchData().then(() => {
            (email !== "" && fetchConversations());
        });
    }, [email]);


    useEffect(() => {
            if (email && !ws && conversations.length > 0) {
                const newWs = new WebSocket(`${process.env.REACT_APP_CHAT_CREATE_ENDPOINT}${email}`);
                setWs(newWs);

                newWs.onopen = () => {
                    console.log("Connected to chat websocket");
                    conversations.forEach((conversation) => {
                        console.log("Subscribing to conversation");
                        newWs.send(JSON.stringify({
                            options: "subscribe",
                            message: "subscribe",
                            destination: conversation,
                        }));
                    });
                };


                newWs.onmessage = (event) => {
                    const idPattern = /^[0-9a-fA-F]{24}$/;

                    if (!idPattern.test(event.data)) {
                        const parsedData = JSON.parse(event.data);
                        const newMessage = {
                            sender: parsedData.sender,
                            message: parsedData.message,
                            date: new Date(),
                        };

                        setNewMessages((prevMessages) => {
                            return [...prevMessages, newMessage];
                        })
                    }
                }


                newWs.onclose = () => {
                    console.log("WebSocket closed");
                };

                setWs(newWs);
            }

            // Close WebSocket connection when component unmounts
            return () => {
                if (ws) {
                    ws.close();
                }
            };
        }
        ,
        [email, conversations, ws]
    );

    const fetchConversations = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_CHAT_CONVERSATIONS_ENDPOINT}${email}`, {
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                const res = await response.json();
                if (res?.status === 200 && res?.message === "ok") {
                    const conversationIds = res.data?.data?.rooms.map((room: { id: any; }) => room.id);
                    setConversations(conversationIds);
                }
            }
        } catch (e) {
            console.error("Error loading chat data:", e);
        }
    };

    const groupMessagesBySender = (messages: NewMessages[]) => {
        const groupedMessages: { [sender: string]: NewMessages[] } = {};
        messages.forEach((message) => {
            if (!groupedMessages[message.sender]) {
                groupedMessages[message.sender] = [];
            }
            groupedMessages[message.sender].push(message);
        });
        return groupedMessages;
    };

    const clearNewMessages = () => {
        setNewMessages([]);
    }

    return (
        <div>
            {newMessages.length > 0 && (
                <Link to="/account?chat" onClick={clearNewMessages}>
                    <div className="group flex relative">
                    <span
                        className="text-white font-bold text-2xl border-teal-600 border-2 rounded-full bg-teal-600 px-3">!</span>
                        <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 w-[800%]
    -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                        New Messages <br/>
                        <ul className="flex flex-col text-lg">
                            {Object.entries(groupMessagesBySender(newMessages)).map(([sender, messages], index) => (
                                <li key={index}>
                                    <strong>{sender}:</strong>
                                    <ul>
                                        {messages.map((message, idx) => (
                                            <li key={idx}>{message.message}<span
                                                className="text-xs ml-2">{message.date.toLocaleTimeString('pl-PL', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric'
                                            })}</span></li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </span>
                    </div>
                </Link>
            )}
        </div>
    );
}
