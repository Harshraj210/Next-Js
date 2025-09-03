import mongoose, { Mongoose } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
  } catch (error) {
    console.log("Soemthing went wrong!!");
    console.log(error);
  }
}
