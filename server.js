import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import cloudinary from "cloudinary";

process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server.");
  process.exit(1);
});
dotenv.config({ path: "Backend/config/config.env" });
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`It's live on http://localhost:${process.env.PORT}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting down the server.");
  server.close(() => {
    process.exit(1);
  });
});
