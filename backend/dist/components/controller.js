"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfiguration = exports.increaseBalance = exports.getBalance = void 0;
const handleApiErrors_1 = require("../utils/handleApiErrors");
const service_1 = __importDefault(require("./service"));
const mailer_1 = require("../utils/mailer");
const mailContent_1 = __importDefault(require("../utils/mailContent"));
const getBalance = async (_, res) => {
    try {
        const data = await service_1.default.getBalance();
        const { tokens, limit } = data || {};
        const validLimit = limit ?? 0;
        const balanceObject = tokensToDollars(tokens, validLimit);
        const allData = { ...data, ...balanceObject };
        res.status(200).json(allData);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error in inserting balance ${err.message}`);
        }
        return (0, handleApiErrors_1.handleApiErrors)(res, err);
    }
};
exports.getBalance = getBalance;
const increaseBalance = async (_, res) => {
    try {
        const tokens = Math.random() * 750;
        await service_1.default.increaseBalance(tokens);
        const config = await service_1.default.getBalance();
        if (!config) {
            return res.status(404).json("User not found");
        }
        else {
            if (!config.limit) {
                return res.status(404).json("Missing limit");
            }
            if (!config.email) {
                return res.status(404).json("Missing email");
            }
            const updatedTokens = config.tokens + tokens;
            const balanceObject = tokensToDollars(updatedTokens, config.limit);
            if (balanceObject.currentPrice >= config.limit && !config.isEmailSent) {
                const content = (0, mailContent_1.default)(config.limit, balanceObject.currentPrice, balanceObject.percentage);
                await (0, mailer_1.sendEmail)(config.email, content);
                await service_1.default.updateEmailStatus();
            }
            res.status(200).json(balanceObject);
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error in inserting Configuration ${err.message}`);
        }
        return (0, handleApiErrors_1.handleApiErrors)(res, err);
    }
};
exports.increaseBalance = increaseBalance;
const setConfiguration = async (req, res) => {
    try {
        const configuration = req.body;
        if (!configuration || !configuration.limit || !configuration.email) {
            return res.status(400).json("Configuration email and limit is required");
        }
        if (configuration.limit < 5 || configuration.limit > 100) {
            return res.status(400).json("Limit should be between 5 and 100");
        }
        const isUpdated = await service_1.default.insertConfiguration(configuration);
        if (!isUpdated) {
            return res.status(404).json("Error in updating configuration");
        }
        res.status(201).json("Configuration set successfully");
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Error in creating Configuration ${err.message}`);
        }
        return (0, handleApiErrors_1.handleApiErrors)(res, err);
    }
};
exports.setConfiguration = setConfiguration;
const calculateTokensToDollars = (tokens) => {
    const pricePerToken = 0.0005;
    return parseFloat((tokens * pricePerToken).toFixed(2));
};
const calculatePercentage = (price, limit) => {
    return parseFloat(((price / limit) * 100).toFixed(2));
};
const tokensToDollars = (tokens = 0, limit) => {
    const currentPrice = calculateTokensToDollars(tokens);
    const percentage = calculatePercentage(currentPrice, limit);
    return {
        currentPrice,
        limit,
        percentage,
    };
};
