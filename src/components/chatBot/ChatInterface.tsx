"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const ChatInterface = () => {
  const [chatResponse, setChatResponse] = useState<any>([]);
  const [sendMessage, setSendMessage] = useState<any>("");

  const [chatSaveStatus, setChatSaveStatus] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post("https://chatbot-service-wrsg.onrender.com/chats/getMessages", {})
      .then((response: any) => {
        if (response) {
          setChatResponse(response.data.messages);
        }
      });
  }, []);

  useEffect(() => {
    if (chatSaveStatus) {
      axios
        .post("https://chatbot-service-wrsg.onrender.com/chats/getMessages", {})
        .then((response: any) => {
          if (response) {
            setChatResponse(response.data.messages);
            setSendMessage("");
          }
        })
        .catch(() => {})
        .finally(() => {
          setChatSaveStatus(false);
        });
    }
  }, [chatSaveStatus]);

  const chatSaveService = async (chatTemp: any) => {
    return await axios
      .post("https://chatbot-service-wrsg.onrender.com/chats/saveMessage", { chat: chatTemp })
      .then((response: any) => {
        if (response.data.status === true) {
          setChatSaveStatus(true);
        }
      })
      .catch(() => {
        alert("something went wrong");
      });
  };

  const onSendMessageChange = (e: any) => {
    setSendMessage(e.target.value);
  };

  const onSendClick = async () => {
    await axios
      .post("https://chatbot-service-wrsg.onrender.com/chats/recieveMessage", {
        messages: sendMessage,
      })
      .then((response: any) => {
        if (response) {
          chatSaveService(response.data);
        }
      });
  };

  const onClearChatClick = async () => {
    await axios
      .post("https://chatbot-service-wrsg.onrender.com/chats/clearChat")
      .then((response: any) => {
        if (response) {
          setChatSaveStatus(true);
        }
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          height: "auto",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1>Chat</h1>
        <div style={{ maxWidth: "300px" }}>
          <ul>
            {chatResponse?.length > 0 &&
              chatResponse.map((messages: any) => {
                return (
                  <>
                    <li
                      style={{
                        textAlign: "left",
                        backgroundColor: "#DCF8C6",
                        padding: "8px",
                        borderRadius: "8px",
                        margin: "4px 0",
                      }}
                    >
                      <p style={{color: 'black'}}>{messages.recievedMessage}</p>
                    </li>
                    <li
                      style={{
                        textAlign: "right",
                        backgroundColor: "#E5E5EA",
                        padding: "8px",
                        borderRadius: "8px",
                        margin: "4px 0",
                      }}
                    >
                      <p style={{color: 'black'}}>{messages.replyMessage}</p>
                    </li>
                  </>
                );
              })}
          </ul>

          <input
            type="text"
            value={sendMessage}
            onChange={(e: any) => onSendMessageChange(e)}
          />
          <button disabled={sendMessage === ""} onClick={() => onSendClick()}>
            Send
          </button>
          <button onClick={() => onClearChatClick()}>Clear Chat</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
