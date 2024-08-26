"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../utils/mongodb/models/config"));
class BalanceService {
    async getBalance() {
        const balance = await config_1.default.findOne({});
        return balance?.toObject();
    }
    async insertConfiguration(configuration) {
        const existingConfig = await config_1.default.findOne({});
        if (existingConfig) {
            throw new Error("Configuration with the given limit already exists");
        }
        const config = await config_1.default.create(configuration);
        return config;
    }
    async increaseBalance(tokens) {
        const balance = await config_1.default.updateOne({ $inc: { tokens } });
        return balance.acknowledged;
    }
    async updateEmailStatus() {
        const balance = await config_1.default.updateOne({ isEmailSent: true });
        return balance.acknowledged;
    }
}
const balanceService = new BalanceService();
exports.default = balanceService;
