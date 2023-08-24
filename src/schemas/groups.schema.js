import { Schema, model, Types } from "mongoose";

const Groups = new Schema(
  {
    dir_ref_id: {
      type: Types.ObjectId,
      required: true,
      ref: "directions",
      key: "_id",
    },
    gr_number: {
      type: BigInt ? Number : Number,
      required: true,
    },
    end_date: {
      type: Date,
    },
  },
  {
    timestamps: {
      updatedAt: "begin_date",
      createdAt: false,
    },
  }
);

export default model("groups", Groups);
