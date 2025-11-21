import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { createDefaultAdmin } from "./src/utils/createDefaultAdmin.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, async () => {
      await createDefaultAdmin();
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to connect to the database FROM the server::-> ",
      error
    );
    throw error;
  });
