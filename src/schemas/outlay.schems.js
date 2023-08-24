import { Schema, model, Types } from "mongoose";

const outlay = new Schema(
  {
    reason: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
    },
    amount: {
      type: BigInt ? Number : Number,
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: false,
      createdAt: "out_time",
    },
  }
);

export default model("outlay", outlay);
