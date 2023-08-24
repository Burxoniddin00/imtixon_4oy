import mongoose from "mongoose";
import { config } from "dotenv";
config()
mongoose
  .connect("mongodb+srv://burxstvoldi:burx1234@cluster0.a6pfzgf.mongodb.net/")
  .then(console.log("connection"))
  .catch((er) => console.log(er.message));
