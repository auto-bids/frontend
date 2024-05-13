import React, {useEffect, useRef, useState} from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface IChat {
    receiverEmail: string;
}

interface IMessage {
    message: string;
    sender: string;
    destination: string;
    options: string;
    time: number;
}

interface IMessageBackend {
    status: number
    message: string
    data: {
        data: {
            messages: {
                Sender: string, Message: string, Time: number
            }
        }[]
    }
}

export default function ChatPopup(props: IChat) {
    const [senderEmail, setSenderEmail] = useState<string>("");
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [subscriptionId, setSubscriptionId] = useState<string>("");
    const [receiverPicture, setReceiverPicture] = useState<string>("");
    const [senderPicture, setSenderPicture] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [allMessagesFetched, setAllMessagesFetched] = useState<boolean>(false);
    const page = useRef<number>(0)
    let subscribed = false;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    useEffect(() => {
            if (senderEmail && !ws) {
                const webSocketUrl = `${process.env.REACT_APP_CHAT_CREATE_ENDPOINT}${senderEmail}`;
                const newWs = new WebSocket(webSocketUrl);

                newWs.onopen = () => {
                        newWs.send(JSON.stringify({
                            options: "create",
                            message: "test",
                            destination: props?.receiverEmail,
                        }));
                };


                newWs.onmessage = (event) => {
                    const message = event.data;
                    const idPattern = /^[0-9a-fA-F]{24}$/;
                    console.log(message)

                    if (!idPattern.test(message)) {
                        const newMessage = {
                            message: JSON.parse(message).message,
                            sender: JSON.parse(message).sender,
                            destination: JSON.parse(message).destination,
                            options: JSON.parse(message).options,
                            time: Date.now()
                        }
                        setMessages((prevMessages) => [...prevMessages, newMessage]);

                    }
                    if (idPattern.test(message) && !subscribed) {
                        // eslint-disable-next-line
                        subscribed = true;
                        newWs.send(JSON.stringify({
                            options: "subscribe",
                            message: "subscribe",
                            destination: message,
                        }));
                        console.log(message)
                        setSubscriptionId(message);
                    }
                }

                newWs.onclose = () => {
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
        [senderEmail, ws]
    );

    const sendMessage = () => {
        if (ws && message !== "" && subscriptionId !== "") {
            ws.send(JSON.stringify({
                options: "message",
                message: message,
                destination: subscriptionId
            }));
            setMessage("")
        }
    }

    const fetchHistoricalMessages = async () => {
        try {
            const response = await fetch(`http://${process.env.REACT_APP_CHAT_HISTORY_ENDPOINT}${subscriptionId}/${props.receiverEmail}/${page.current}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });

            if (response.status === 302) {
                const res: IMessageBackend = await response.json();
                if (res.data.data) {
                    const messagesData = res.data.data.map((message) => {
                        return {
                            message: message.messages.Message,
                            sender: message.messages.Sender,
                            destination: "",
                            options: "",
                            time: message.messages.Time * 1000
                        }
                    });
                    setMessages((prevMessages) => [...messagesData.reverse(), ...prevMessages]);
                    page.current++;
                    if (res.data.data.length < 10) {
                        setAllMessagesFetched(true);
                    }
                } else {
                    setAllMessagesFetched(true);
                }
            }
        } catch (error) {
            console.error("Error loading profile data:", error);
        }
    };
    const fetchReceiverPicture = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PROFILE_EMAIL_ENDPOINT}${props.receiverEmail}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                },
            });
            if (response.ok) {
                const res = await response.json();
                return res.data?.data.profile_image;
            }
        } catch (error) {
            console.error("Error loading profile data:", error);
        }
    }

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
                const res = await response.json();
                return res.data?.data;
            }
        } catch (error) {
            console.error("Error loading profile data:", error);
        }
    };

    React.useEffect(() => {
        fetchData().then(r => {
            setSenderEmail(r.email);
            setSenderPicture(r.profile_image);
        });

        fetchReceiverPicture().then(r => {
            setReceiverPicture(r);
        });
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        if (subscriptionId !== "")
            fetchHistoricalMessages().then();
        // eslint-disable-next-line
    }, [subscriptionId]);


    return (
        <div className="flex-col h-[98%] w-[90%] m-auto pb-3">
            <h1 className="text-center text-3xl">Chat</h1>
            <div className="flex flex-col h-full">
                <div
                    className="flex-grow h-0 border-2 border-neutral-400 border-b-0 w-full overflow-auto rounded-xl rounded-b-none p-3">
                    {!allMessagesFetched &&
                        <button className="ml-[42%] text-teal-500 hover:text-teal-900 mb-5"
                                onClick={fetchHistoricalMessages}
                        >====Load More====
                        </button>}
                    {messages.map((message, index) => (
                        message.sender === props.receiverEmail ?
                            <div key={index + "div"}>
                                <div key={index + "profile"} className="flex mb-[-5px]">
                                    <div className="flex flex-row">
                                        <LazyLoadImage
                                            src={receiverPicture}
                                            alt="receiverPicture"
                                            className="w-10 h-10 rounded-full"
                                            effect="blur"
                                        />
                                        <p className="mt-1.5 ml-3">{message.sender}</p>
                                    </div>
                                </div>
                                <div key={index + "message"} style={{display: 'inline-block'}}
                                     className="mt-5 ml-3 border-teal-400 border-2 rounded-2xl pr-2 bg-teal-200 px-2 py-1 mb-4 text-left">{message.message}
                                </div>
                                <span
                                    className="text-xs text-gray-500 ml-2">{new Date(message.time).toLocaleString()}</span>
                            </div> :
                            <div key={index + "div"}>
                                <div key={index + "sender"} className="flex justify-end mb-[-5px]">
                                    <div className="flex flex-row">
                                        <p className="mt-1.5 mr-3">{message.sender}</p>
                                        <LazyLoadImage
                                            src={senderPicture}
                                            alt="senderPicture"
                                            className="w-10 h-10 rounded-full"
                                            effect="blur"
                                        />
                                    </div>
                                </div>
                                <div className="text-right mr-3">
                                    <span
                                        className="text-xs text-gray-500 mr-2">{new Date(message.time).toLocaleString()}</span>
                                    <div key={index + "sendM"} style={{display: 'inline-block'}}
                                         className="mt-5 mb-10 border-teal-400 border-2 rounded-full pr-2 bg-teal-200 text-right px-2 py-1">{message.message}
                                    </div>
                                </div>

                            </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
                <div className="flex h-[45px] border-neutral-600 border-2 rounded-xl rounded-t-none">
                    <textarea onChange={(e) => {
                        setMessage(e.target.value)
                    }} value={message} className="w-[90%] border-2 rounded-lg m-auto overflow-auto h-[33px] pl-2 pt-0.5"
                              maxLength={1280}
                    />
                    <button onClick={sendMessage} className="
                    bg-teal-700 h-[33px] px-3 m-auto text-white rounded ml-2 hover:bg-teal-800 transition duration-30">Send
                    </button>
                </div>
            </div>
        </div>
    );
}