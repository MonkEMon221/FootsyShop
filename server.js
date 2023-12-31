import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

import cors from "cors";

/*config env*/
dotenv.config();

/*config database*/
connectDb();
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
console.log(__dirname, __fileName);
const app = express();

/*middlewares*/
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/dist")));
console.log(__dirname, __fileName);

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

/*resp api*/
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

const PORT = process.env.PORT || 8080;

/*App listen*/
app.listen(PORT, () => {
  console.log(`Server running on  ${PORT}`);
});
