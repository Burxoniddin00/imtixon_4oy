import { Types } from "mongoose";
import departmentsModul from "../schemas/departments.schema.js";

class Departments {
  async select(id, filter, option) {
    try {
      if (id) return await departmentsModul.findById(id, option).populate("center_ref_id");
      return await departmentsModul
        .find(filter, option)
        .populate("center_ref_id");
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await departmentsModul.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await departmentsModul.updateOne(
      { _id: new Types.ObjectId(id) },
      { delete_at: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      console.log(_id);
      return await departmentsModul.findByIdAndUpdate({_id}, {obj});
    } catch (error) {
      return error.message
    }
  }
}


export default new Departments();
