"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./utils/environment");
const db_1 = __importDefault(require("./utils/mongodb/db"));
const app_1 = __importDefault(require("./app"));
const bootstrap = async () => {
    await (0, db_1.default)();
};
bootstrap()
    .then(async () => {
    app_1.default.listen(environment_1.PORT, () => {
        console.info(`Server is up and running on port: ${environment_1.PORT}`);
    });
})
    .catch(async (err) => {
    console.error(`failed to init services: ${err}`);
});
