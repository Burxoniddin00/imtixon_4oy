import { Types } from "mongoose";
import directions from "../schemas/directions.schema.js";

class Directions {
  async select(id, filter, option) {
    try {
      if (id) return await directions.findById(id, option);
      return await directions.find(filter, option).populate("dep_ref_id");
    } catch (error) {
      return error.message;
    }
  }

  async insert(body) {
    try {
      return await directions.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await directions.updateOne(
      { _id: new Types.ObjectId(id) },
      { delete_at: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await directions.findByIdAndUpdate({ _id }, { obj });
    } catch (error) {
      return error.message;
    }
  }
}

export default new Directions();
