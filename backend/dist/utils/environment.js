"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_ADDRESS = exports.EMAIL_PASSWORD = exports.DATABASE_TABLE = exports.DATABASE_ENDPOINT = exports.DATABASE_PASSWORD = exports.DATABASE_USER = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
const zod_1 = require("zod");
(0, dotenv_1.config)();
const zRequired = () => zod_1.z.string().min(1);
const envSchema = zod_1.z.object({
    PORT: zRequired(),
    DATABASE_USER: zRequired(),
    DATABASE_PASSWORD: zRequired(),
    DATABASE_ENDPOINT: zRequired(),
    DATABASE_TABLE: zRequired(),
    EMAIL_PASSWORD: zRequired(),
    EMAIL_ADDRESS: zRequired(),
});
let env;
try {
    env = envSchema.parse(process.env);
}
catch (error) {
    if (error instanceof zod_1.z.ZodError) {
        console.error("Invalid environment configuration:", error.errors);
    }
    else {
        console.error("Unexpected error:", error);
    }
    process.exit(1);
}
exports.PORT = env.PORT, exports.DATABASE_USER = env.DATABASE_USER, exports.DATABASE_PASSWORD = env.DATABASE_PASSWORD, exports.DATABASE_ENDPOINT = env.DATABASE_ENDPOINT, exports.DATABASE_TABLE = env.DATABASE_TABLE, exports.EMAIL_PASSWORD = env.EMAIL_PASSWORD, exports.EMAIL_ADDRESS = env.EMAIL_ADDRESS;
