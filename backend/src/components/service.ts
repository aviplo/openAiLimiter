import configModel from "../utils/mongodb/models/config";

class BalanceService {
  async getBalance() {
    const balance = await configModel.findOne({});
    return balance?.toObject();
  }
  async insertConfiguration(configuration: Configuration) {
    const existingConfig = await configModel.findOne({});
    if (existingConfig) {
      throw new Error("Configuration with the given limit already exists");
    }
    const config = await configModel.create(configuration);

    return config;
  }

  async increaseBalance(tokens: number) {
    const balance = await configModel.updateOne({ $inc: { tokens } });
    return balance.acknowledged;
  }
  async updateEmailStatus() {
    const balance = await configModel.updateOne({ isEmailSent: true });
    return balance.acknowledged;
  }
}

const balanceService = new BalanceService();
export default balanceService;
