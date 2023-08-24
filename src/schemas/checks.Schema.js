import { Schema, model, Types } from "mongoose";

const Checks = new Schema(
  {
    gr_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "groups",
      key: "_id",
    },
    user_ref_id: {
        type: Types.ObjectId,
        required: true,
        ref: "users",
        key: "_id",
    },
    not_in_class: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: {
      updatedAt: "add_date",
      createdAt: false,
    },
  }
);

export default model("checks", Checks);
