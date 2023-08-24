import { Types } from "mongoose";
import incomes from "../schemas/incomes.schema.js";

class Incomes {
  async select(id, filter, option) {
    try {
      if (id) return await incomes.findById(id, option);
      return await incomes.find(filter, option).populate("user_ref_id");
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await incomes.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await incomes.updateOne(
      { _id: new Types.ObjectId(id) },
      { delete_at: Date.now() },
      { new: true }
    );
  }
  async updet(id, obj) {
    return await incomes.findByIdAndUpdate(id, obj);
  }
}


export default new Incomes();
