import { Types } from "mongoose";
import positions from "../schemas/positions.schema.js";

class Positions {
  async select(id, filter, option) {
    try {
      if (id) return await positions.findById(id, option);
      return await positions.find(filter, option).populate("dep_ref_id");
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await positions.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await positions.updateOne(
      { _id: new Types.ObjectId(id) },
      { delete_at: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await positions.findByIdAndUpdate({ _id }, { obj });
    } catch (error) {
      return error.message;
    }
  }
}

export default new Positions();
