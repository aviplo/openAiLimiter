import { Router } from "express";
import { getBalance, setConfiguration, increaseBalance } from "./controller";

const router = Router();

router.route("/balance").get(getBalance).post(increaseBalance);

router.route("/configuration").post(setConfiguration);

export default router;
