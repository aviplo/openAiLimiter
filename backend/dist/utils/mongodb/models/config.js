"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const configSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    limit: {
        type: Number,
        max: 100,
        min: 5,
        immutable: true,
    },
    tokens: {
        type: Number,
        default: 0,
    },
    isEmailSent: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const collectionName = "Configuration";
const ConfigModel = (0, mongoose_1.model)(collectionName, configSchema);
exports.default = ConfigModel;
