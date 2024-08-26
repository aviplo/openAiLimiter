import React from "react";
import "./WelcomeMessage.css";

interface WelcomeMessageProps {
  name: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ name }) => {
  return (
    <div className="welcome-message-container">
      <h1>{`Welcome ${name} to Chat Application!`}</h1>
    </div>
  );
};

export default WelcomeMessage;
