"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApiErrors = void 0;
const axios_1 = require("axios");
const http_errors_1 = require("http-errors");
const handleApiErrors = (res, err) => {
    if (err instanceof http_errors_1.HttpError) {
        console.info({ stack: err.stack, message: err.message });
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof axios_1.AxiosError) {
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
exports.handleApiErrors = handleApiErrors;
