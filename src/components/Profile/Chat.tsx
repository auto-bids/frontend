import React from 'react';


interface IChatPopup {
    receiverEmail: string;
}

export default function ChatPopup(props: IChatPopup){
    const [senderEmail, setSenderEmail] = React.useState<string>("");

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
        fetchData().then(r => setSenderEmail(r.email));
    }, []);


    if(props.receiverEmail != "") {
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
                <h1>Chat Popup</h1>
                <p>Sender: {senderEmail}</p>
                <p>Receiver: No receiver</p>
            </div>
        );
    }
}