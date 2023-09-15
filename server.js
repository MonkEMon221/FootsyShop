import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import cors from "cors";

/*config env*/
dotenv.config();

/*config database*/
connectDb();

const app = express();

/*middlewares*/
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

/*resp api*/
app.get("/", (req, res) => {
  res.send("<h1>Hello Ecommerc</h1>");
});

const PORT = process.env.PORT || 8080;

/*App listen*/
app.listen(PORT, () => {
  console.log(`Server running on  ${PORT}`);
});
