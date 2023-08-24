import { Schema, model, Types } from "mongoose";

const incomes = new Schema(
  {
    reason: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 25,
    },
    user_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
      key: "_id",
    },
    amount: {
      type: BigInt ? Number : Number,
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: false,
      createdAt: "inc_time",
    },
  }
);

export default model("incomes", incomes);
