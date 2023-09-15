import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to DB ${error}`);
  }
};

export default connectDb;
