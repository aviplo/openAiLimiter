import { PORT } from "./utils/environment";
import connectDB from "./utils/mongodb/db";
import app from "./app";

const bootstrap = async () => {
  await connectDB();
};

bootstrap()
  .then(async () => {
    app.listen(PORT, () => {
      console.info(`Server is up and running on port: ${PORT}`);
    });
  })
  .catch(async (err) => {
    console.error(`failed to init services: ${err}`);
  });
