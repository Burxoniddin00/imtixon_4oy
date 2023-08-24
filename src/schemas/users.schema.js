import { Schema, model, Types } from "mongoose";

const Users = new Schema(
  {
    pos_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "positions",
      key: "_id",
    },
    first_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 20,
    },
    last_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 20,
    },
    gender: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 20,
    },
    contact: {
      type: String,
      required: true,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      email: true,
      maxLength: 64,
    },
    group_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "groups",
      key: "_id",
    },
    left_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      updatedAt: "come_date",
      createdAt: false,
    },
  }
);

export default model("users", Users);
