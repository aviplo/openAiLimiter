import React, { useState } from "react";
import "./chat.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ChatInputProps = {
  onSendMessage: () => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post("http://localhost:3000/balance");
        setMessage("");
        onSendMessage();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      toast.error("The chat box is empty.", {
        className: "toast-message",
      });
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        className="chat-input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage} className="send-button">
        Send
      </button>
      <ToastContainer />
    </div>
  );
};

export default ChatInput;
