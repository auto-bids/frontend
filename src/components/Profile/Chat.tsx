import React, {useEffect} from 'react';
import useWebSocket from 'react-use-websocket';

interface IChat {
    receiverEmail: string;
}

export default function Chat(props: IChat) {
    const [senderEmail, setSenderEmail] = React.useState<string>("");
    const [receiverEmail, setReceiverEmail] = React.useState<string>("");

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
    }

    React.useEffect(() => {
        fetchData().then(r => {
            setSenderEmail(r.email);
        });

        return () => {
            const websocket = getWebSocket();
            if (websocket) {
                console.log("closing websocket")
                websocket.close();
            }
        }
    }, []);

    const webSocketUrl = `${process.env.REACT_APP_CHAT_CREATE_ENDPOINT}${senderEmail}`;
    const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(senderEmail ? webSocketUrl : null);

    const createChat = (destination: string) => {
        sendMessage(JSON.stringify({
            options: "create",
            message: "test",
            destination: destination,
        }));
    }

    useEffect(() => {
        if (lastMessage !== null) {
            console.log(lastMessage.data);
        }
    }, [lastMessage]);


    useEffect(() => {
        if (readyState === 1) {
            createChat(props.receiverEmail);
        }
    }, [readyState]);

    if (props.receiverEmail != "") {
        return (
            <div>
                <h1>Chat Popup</h1>
                <p>Sender: {senderEmail}</p>
                <p>Receiver: {props.receiverEmail}</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Chat</h1>
                <p>Sender: {senderEmail}</p>
                <p> List Of Receivers</p>
            </div>
        );
    }
}