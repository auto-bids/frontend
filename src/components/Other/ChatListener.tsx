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
    const [chatWs, setChatWs] = useState<WebSocket>()
    const [bidWs, setBidWs] = useState<WebSocket>();
    const [joinedAuctions, setJoinedAuctions] = useState<string[]>([]);

    useEffect(() => {
        if (document.cookie === "isLoggedIn=true") {
            const fetchData = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/profiles/login/me`, {
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
                (email !== "" && fetchJoinedAuctions(0));
            });
        }
    }, [email]);

    const fetchJoinedAuctions = async (i: number) => {
        try {
            fetch(`${process.env.REACT_APP_AUCTIONS_ENDPOINT}joined/${email}/${i}`, {
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            }).then(
                response => response.json()
            ).then(data => {
                    if (data.data.data !== null) {
                        setJoinedAuctions((prevState) => [...prevState, ...data.data.data.map((auction: {
                            _id: any;
                        }) => auction._id)]);
                        if (data.data.data.length === 10) {
                            fetchJoinedAuctions(i + 1)
                        }
                    }
                }
            )
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
            if (email && !chatWs && conversations.length > 0) {
                const newWs = new WebSocket(`${process.env.REACT_APP_CHAT_CREATE_ENDPOINT}${email}`);
                setChatWs(newWs);

                newWs.onopen = () => {
                    conversations.forEach((conversation) => {
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
                        if (parsedData.sender === email) {
                            return;
                        }
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

                setChatWs(newWs);
            }

            // Close WebSocket connection when component unmounts
            return () => {
                if (chatWs) {
                    chatWs.close();
                }
            };
        }
        ,
        [email, conversations, chatWs]
    );

    useEffect(() => {
            if (email && !bidWs && joinedAuctions.length > 0) {
                const bidWs = new WebSocket(`${process.env.REACT_APP_AUCTIONS_WS_ENDPOINT}${email}`);
                setBidWs(bidWs);

                bidWs.onopen = () => {
                    joinedAuctions.forEach((auction) => {
                        bidWs.send(JSON.stringify({
                            options: "join",
                            destination: auction,
                        }));
                    });
                };


                bidWs.onmessage = (event) => {
                    if (event.data.includes("offer") && event.data.includes("status")) {
                        const data = JSON.parse(event.data);
                        if (data.offer.sender === email) {
                            alert("You won an auction!")
                        }
                    }
                }


                bidWs.onclose = () => {
                    console.log("WebSocket closed");
                };

                setBidWs(bidWs);
            }

            // Close WebSocket connection when component unmounts
            return () => {
                if (bidWs) {
                    bidWs.close();
                }
            };
        }
        ,
        [email, conversations, bidWs]
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
