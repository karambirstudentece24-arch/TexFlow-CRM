import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log("❌ MongoDB Connection Failed");
    console.log(err.name);
    console.log(err.message);

    if (err.reason) {
      console.log("Reason:", err.reason);
    }

    process.exit(1);
  }
};

export default connectDB;