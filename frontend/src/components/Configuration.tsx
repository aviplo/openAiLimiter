import React, { useState } from "react";
import signInSchema from "../validation";
import { z } from "zod";
import "./configuration.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ConfigurationProps = {
  handleSendMessage: () => void;
};

const Configuration: React.FC<ConfigurationProps> = ({ handleSendMessage }) => {
  const [config, setConfig] = useState<{
    email: string;
    limit: number;
    name: string;
  } | null>(null);
  const [errors, setErrors] = useState<{
    email?: string;
    limit?: string;
    name?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "limit") {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          limit: "Limit must be a number",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, limit: undefined }));
        setConfig(
          (prevConfig) =>
            ({
              ...prevConfig,
              [id]: parsedValue,
            }) as { email: string; limit: number; name: string },
        );
      }
    } else {
      setConfig(
        (prevConfig) =>
          ({
            ...prevConfig,
            [id]: value,
          }) as { email: string; limit: number; name: string },
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (config) {
      try {
        signInSchema.parse({
          email: config.email,
          limit: config.limit,
          name: config.name,
        });
        axios
          .post("http://localhost:3000/configuration", config)
          .then((res) => {
            if (res.status === 201) {
              toast.success("Configuration set successfully", {
                className: "toast-message",
              });
              handleSendMessage();
            } else {
              toast.error("Error in creating Configuration", {
                className: "toast-message",
              });
            }
          })
          .catch((error) => {
            if (error.response) {
              if (error.response.status === 404) {
                toast.error("Endpoint not found (404)", {
                  className: "toast-message",
                });
              } else {
                toast.error(
                  `Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
                ),
                  {
                    className: "toast-message",
                  };
              }
            } else if (error.request) {
              toast.error("No response received from the server.", {
                className: "toast-message",
              });
            } else {
              toast.error("Error in setting up the request: " + error.message),
                {
                  className: "toast-message",
                };
            }
          });
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: { email?: string; limit?: string; name?: string } =
            {};
          error.errors.forEach((err) => {
            if (err.path[0] === "email") {
              newErrors.email = err.message;
            } else if (err.path[0] === "limit") {
              newErrors.limit = err.message;
            } else if (err.path[0] === "name") {
              newErrors.name = err.message;
            }
          });
          setErrors(newErrors);
        }
      }
    } else {
      setErrors({
        email: "Email is required",
        limit: "Limit is required",
        name: "Name is required",
      });
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [id]: undefined }));
  };

  return (
    <div className="set-limit-window">
      <h2>Limit OpenAI usage</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="limit">Limit</label>
          <input
            type="text"
            id="limit"
            value={config?.limit || ""}
            onChange={handleInputChange}
            placeholder="Enter limit"
            onFocus={handleInputFocus}
          />
          {errors.limit && <p className="error">{errors.limit}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={config?.name}
            onChange={handleInputChange}
            placeholder="Enter name"
            onFocus={handleInputFocus}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={config?.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            onFocus={handleInputFocus}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Configuration;
