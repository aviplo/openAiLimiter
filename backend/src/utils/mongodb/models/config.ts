/* eslint-disable no-case-declarations */
import { Schema, model } from "mongoose";

const configSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
  },
);

const collectionName = "Configuration";
const ConfigModel = model(collectionName, configSchema);

export default ConfigModel;
