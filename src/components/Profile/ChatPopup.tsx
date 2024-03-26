import React, {useEffect, useRef} from 'react';

interface IChat {
    receiverEmail: string;
}

export default function ChatPopup(props: IChat) {
    const [senderEmail, setSenderEmail] = React.useState<string>("");
    const [messages, setMessages] = React.useState<string[]>([]);
    const [ws, setWs] = React.useState<WebSocket | null>(null);
    let subscribed = false;

    useEffect(() => {
        if (senderEmail && !ws) {
            const webSocketUrl = `${process.env.REACT_APP_CHAT_CREATE_ENDPOINT}${senderEmail}`;
            const newWs = new WebSocket(webSocketUrl);

            newWs.onopen = () => {
                console.log("WebSocket opened");
                newWs.send(JSON.stringify({
                    options: "create",
                    message: "test",
                    destination: props.receiverEmail,
                }));
            };


            newWs.onmessage = (event) => {
                const message = event.data;
                setMessages(prevMessages => [...prevMessages, message]);

                const idPattern = /^[0-9a-fA-F]{24}$/;

                if (idPattern.test(message) && !subscribed) {
                    subscribed = true;
                    newWs.send(JSON.stringify({
                        options: "subscribe",
                        message: "subscribe",
                        destination: message
                    }));
                    console.log("sub")
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
    }, [senderEmail, ws]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_PROFILE_LOGIN_ENDPOINT}`, {
                method: "POST",
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
        });
    }, []);

    return (
        <div>
            <h1>Chat Popup</h1>
            <p>Sender: {senderEmail}</p>
            <p>Receiver: {props.receiverEmail}</p>
            {messages}
        </div>
    );
}
