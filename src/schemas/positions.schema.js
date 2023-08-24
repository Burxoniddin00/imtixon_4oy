import { Schema, model, Types } from "mongoose";

const Positions = new Schema(
  {
    pos_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 25,
    },
    dep_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "departments",
      key: "_id",
    },
    salary: {
      type: BigInt ? Number : Number,
    },
    delete_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      updatedAt: false,
      createdAt: false,
    },
  }
);

export default model("positions", Positions);
