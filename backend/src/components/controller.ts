import { RequestHandler } from "express";
import { handleApiErrors } from "../utils/handleApiErrors";
import balanceService from "./service";
import { sendEmail } from "../utils/mailer";
import emailContent from "../utils/mailContent";
import { encoding_for_model } from "tiktoken";

const openAiModel = "gpt-3.5-turbo";

export const getBalance: RequestHandler = async (_, res) => {
  try {
    const data = await balanceService.getBalance();

    const { tokens, limit } = data || {};
    const validLimit = limit ?? 0;
    const balanceObject = tokensToDollars(tokens, validLimit);
    const allData = { ...data, ...balanceObject };
    res.status(200).json(allData);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error in inserting balance ${err.message}`);
    }
    return handleApiErrors(res, err);
  }
};

export const increaseBalance: RequestHandler = async (_, res) => {
  try {
    const tokens = Math.random() * 750;
    await balanceService.increaseBalance(tokens);
    const config = await balanceService.getBalance();
    if (!config) {
      return res.status(404).json("User not found");
    } else {
      if (!config.limit) {
        return res.status(400).json("Missing limit");
      }
      if (!config.email) {
        return res.status(400).json("Missing email");
      }
      const updatedTokens = config.tokens + tokens;
      const balanceObject = tokensToDollars(updatedTokens, config.limit);
      if (balanceObject.currentPrice >= config.limit && !config.isEmailSent) {
        const content = emailContent(
          config.limit,
          balanceObject.currentPrice,
          balanceObject.percentage
        );
        await sendEmail(config.email, content);
        await balanceService.updateEmailStatus();
      }
      res.status(200).json(balanceObject);
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error in inserting Configuration ${err.message}`);
    }

    return handleApiErrors(res, err);
  }
};
export const setConfiguration: RequestHandler = async (req, res) => {
  try {
    const configuration = req.body;
    if (!configuration || !configuration.limit || !configuration.email) {
      return res.status(400).json("Configuration email and limit is required");
    }
    if (configuration.limit < 5 || configuration.limit > 100) {
      return res.status(400).json("Limit should be between 5 and 100");
    }
    const isUpdated = await balanceService.insertConfiguration(configuration);
    if (!isUpdated) {
      return res.status(400).json("Error in updating configuration");
    }
    res.status(201).json("Configuration set successfully");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`Error in creating Configuration ${err.message}`);
    }

    return handleApiErrors(res, err);
  }
};

const calculateTokensToDollars = (tokens: number) => {
  const pricePerToken = 0.0005;
  return parseFloat((tokens * pricePerToken).toFixed(2));
};

const calculatePercentage = (price: number, limit: number): number => {
  return parseFloat(((price / limit) * 100).toFixed(2));
};

const tokensToDollars = (tokens: number = 0, limit: number) => {
  const currentPrice = calculateTokensToDollars(tokens);
  const percentage = calculatePercentage(currentPrice, limit);
  return {
    currentPrice,
    limit,
    percentage,
  };

  const getTokens = (context: string) => {
    console.log({ function: "getTokens" });

    const encoding = encoding_for_model(openAiModel);
    const tokensCount = encoding.encode(context).length;
    encoding.free();

    return tokensCount;
  };
};
