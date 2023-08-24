import { Types } from "mongoose";
import outlay from "../schemas/outlay.schems.js";

class Outlay {
  async select(id, filter, option) {
    try {
      if (id) return await outlay.findById(id, option);
      return await outlay.find(filter, option);
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await outlay.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await outlay.updateOne(
      { _id: new Types.ObjectId(id) },
      { delete_at: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await outlay.findByIdAndUpdate({ _id }, { obj });
    } catch (error) {
      return error.message;
    }
  }
}

export default new Outlay();
