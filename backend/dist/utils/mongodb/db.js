"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("../environment");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${environment_1.DATABASE_USER}:${environment_1.DATABASE_PASSWORD}@${environment_1.DATABASE_ENDPOINT}/${environment_1.DATABASE_TABLE}`);
        console.info("database connection success");
    }
    catch (ex) {
        console.error(`database connection refused: ${ex}`);
        process.exit(1);
    }
};
exports.default = connectDB;
