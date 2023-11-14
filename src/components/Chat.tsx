import React, { useState, useEffect } from "react";
import Message from "./Message";

interface IMessage {
  senderId: number;
  datetime: string;
  message: string;
  id: number;
}

interface IConversation {
  userId: number;
  messages: IMessage[];
}

export default function Chat() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/conversations")
      .then((res) => res.json())
      .then((data) => setConversations(data));
  }, []);

  useEffect(() => {
    if (selectedConversation !== null) {
      const interval = setInterval(() => {
        fetch(`http://localhost:3000/messages/${selectedConversation}`)
          .then((res) => res.json())
          .then((data) => {
            setConversations((prevConversations) =>
              prevConversations.map((conv) =>
                conv.userId === selectedConversation ? { ...conv, messages: data } : conv
              )
            );
          });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedConversation]);

  const handleSend = () => {
    if (selectedConversation !== null) {
      fetch(`http://localhost:3000/messages/${selectedConversation}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })
        .then((res) => res.json())
        .then((data: IMessage) => {
          setConversations((prevConversations) =>
            prevConversations.map((conv) =>
              conv.userId === selectedConversation
                ? { ...conv, messages: [...conv.messages, data] }
                : conv
            )
          );
          setInput("");
        });
    }
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <h2>Chats</h2>
      </div>
      <div className="chat-tabs">
        {conversations.map((conversation) => (
          <div
            key={conversation.userId}
            onClick={() => setSelectedConversation(conversation.userId)}
            className={`chat-tab ${selectedConversation === conversation.userId ? "active" : ""}`}
          >
            User {conversation.userId}
          </div>
        ))}
      </div>
      {selectedConversation !== null && (
        <>
          <div className="chat-messages">
            {conversations
              .find((conv) => conv.userId === selectedConversation)
              ?.messages.map((message: IMessage) => (
                <Message key={message.id} datetime={message.datetime} message={message.message} />
              ))}
          </div>
          <div className="chat-input">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}
