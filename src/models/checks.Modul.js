import { Types } from "mongoose";
import checksModul from "../schemas/checks.Schema.js";

class Checks {
  async select(id, filter, option) {
    try {
      if (id) return await checksModul.findById(id, option);
      return await checksModul
        .find(filter, option)
        .populate("gr_ref_id")
        .populate("user_ref_id");
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await checksModul.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await checksModul.updateOne(
      { _id: new Types.ObjectId(id) },
      { delete_at: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await checksModul.findByIdAndUpdate({ _id }, { obj });
    } catch (error) {
      return error.message;
    }
  }
}

export default new Checks();
