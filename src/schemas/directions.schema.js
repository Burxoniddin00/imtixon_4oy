import { Schema, model, Types } from "mongoose";

const Directions = new Schema(
  {
    dir_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 30,
    },
    dep_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "departments",
      key: "_id",
    },
    duration: {
      type: BigInt ? Number : Number,
      required: true,
    },
    salary: {
      type: BigInt ? Number : Number,
      required: true,
    },
    delete_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "start_date",
      updatedAt: false,
    },
  }
);

export default model("directions", Directions);
