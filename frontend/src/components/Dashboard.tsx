import React from "react";
import ChatInput from "./Chat";
import BillingOutput from "./BillingOutput";
import WelcomeMessage from "./WelcomeMessage";
import { Balance } from "../App";
import "./Dashboard.css";

export interface DashboardProps {
  data: Balance;
  onRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ data, onRefresh }) => {
  return (
    <div>
      <WelcomeMessage name={data.name} />
      <div className="billing-container">
        <BillingOutput limit={data.limit} type="limit">
          Only pay for what you use
        </BillingOutput>
        <BillingOutput
          limit={data.limit}
          usage={data.currentPrice}
          percentage={data.percentage}
          type="usage"
        >
          Usage
        </BillingOutput>
      </div>
      <ChatInput onSendMessage={onRefresh} />
    </div>
  );
};

export default Dashboard;
