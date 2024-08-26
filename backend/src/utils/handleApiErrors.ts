import { AxiosError } from "axios";
import { type Response } from "express";
import { HttpError } from "http-errors";

export const handleApiErrors = (res: Response, err: unknown): Response => {
  if (err instanceof HttpError) {
    console.info({ stack: err.stack, message: err.message });
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof AxiosError) {
    console.error({ stack: err.stack, error: err.message });
    return res
      .status(err.response?.status || 500)
      .json({ message: err.message });
  }

  if (err instanceof SyntaxError) {
    console.error({ stack: err.stack, message: err.message });
    return res.status(400).json({ message: "Invalid JSON format" });
  }

  if (err instanceof TypeError) {
    console.error({ stack: err.stack, message: err.message });
    return res.status(400).json({ message: "Type error occurred" });
  }

  if (err instanceof Error) {
    console.error({ stack: err.stack, message: err.message });
    if (err.message === "Not Found") {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (err.message === "Configuration limit already exists") {
      return res
        .status(409)
        .json({ message: "Configuration limit already exists" });
    }
    return res.status(500).json({ message: err.message });
  }

  console.error({ error: err });
  return res.status(500).json({ message: "Something went wrong" });
};
