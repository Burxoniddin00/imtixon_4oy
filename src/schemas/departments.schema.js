import { Schema, model, Types } from "mongoose";

const Departments = new Schema(
  {
    dep_name: {
      type: String,
      required: true,
      match: /[a-zA-Z0-9]{3,15}/,
      maxLength: 60,
    },
    center_ref_id: {
      type: Types.ObjectId,
      ref: "admin",
      key: "_id",
    },
    delete_at: {
      type: Date,
    },
  },
  {
    timestamps: {
      createdAt: "create_at",
      updatedAt: false,
    },
  }
);

export default model("departments", Departments);
