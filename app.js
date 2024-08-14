import express from "express";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import order1 from "./routes/orderRoute1.js";
import order2 from "./routes/orderRoute2.js";
import payment from "./routes/paymentRoute.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./config/config.env" });
}
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order1);
app.use("/api/v1", order2);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use(errorMiddleware);
export default app;
