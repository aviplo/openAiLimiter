"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const router = (0, express_1.Router)();
router.route("/balance").get(controller_1.getBalance).post(controller_1.increaseBalance);
router.route("/configuration").post(controller_1.setConfiguration);
exports.default = router;
