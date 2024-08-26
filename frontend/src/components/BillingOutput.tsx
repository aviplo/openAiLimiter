import React from "react";
import "./BillingOutput.css";

interface BillingOutputProps {
  limit: number;
  usage?: number;
  percentage?: number;
  type: "limit" | "usage";
  children: React.ReactNode;
}

const BillingOutput: React.FC<BillingOutputProps> = ({
  limit,
  usage,
  percentage,
  type,
  children,
}) => {
  let containerClass;

  if (percentage !== undefined) {
    if (percentage > 100) {
      containerClass = "container red";
    } else if (percentage > 80) {
      containerClass = "container orange";
    }
  }
  return (
    <div className={containerClass}>
      <div className="label">{children}</div>
      <div className="balanceContainer">
        {type === "limit" && (
          <>
            <span className="balanceText">Credit Limit</span>
            <span className="balanceAmount">${limit}</span>
          </>
        )}
        {type === "usage" &&
          usage !== undefined &&
          percentage !== undefined && (
            <>
              <span className="balanceAmount">${usage}</span>
              {containerClass == "container orange" && (
                <span className="warning">
                  The user has reached 80% of the limit
                </span>
              )}
              <span className="percentage">{percentage}%</span>
            </>
          )}
      </div>
    </div>
  );
};

export default BillingOutput;
