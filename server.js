import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  express.json({
    limit: "100mb",
  })
);

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    origin: [
      "http://localhost:3000",
      `${process.env.FRONTEND_API_BASE_URL}`,
      `${process.env.UNSEC_API_BASE_URL}`,
      `${process.env.SEC_API_BASE_URL}`,
    ],
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
