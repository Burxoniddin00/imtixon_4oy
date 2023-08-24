import { Schema, model, Types } from "mongoose";

const Admin = new Schema(
  {
    name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 50,
      required: true,
    },
    contact: {
      type: String,
      match: /[0-9]{9,13}/,
      required: true,
      maxLength: 15,
    },
    address: {
      type: String,
      match: /[a-zA-Z0-9]{5,15}/,
      maxLength: 128,
    },
    email: {
      type: String,
      email: true,
      required: true,
    },
    close_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "open_date",
      updatedAt: false,
    },
  }
);

export default model("admin", Admin);
