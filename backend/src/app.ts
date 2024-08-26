import express from "express";
import cors from "cors";
import balanceRouter from "./components/router";

const app = express();

app.use(cors());
app.use(
  express.json({
    type: ["application/json"],
  }),
);

app.use("/health", (_, res) => {
  res.send("OK");
});
app.use("/", balanceRouter);

export default app;
