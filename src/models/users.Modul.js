import { Types } from "mongoose";
import users from "../schemas/users.schema.js";

class Users {
  async select(id, filter, option) {
    try {
      if (id) return await users.findById(id, option);
      return await users
        .find(filter, option)
        .populate("pos_ref_id" ? "pos_ref_id" : "group_ref_id");
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await users.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await users.updateOne(
      { _id: new Types.ObjectId(id) },
      { left_date: Date.now() },
      { new: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await users.findByIdAndUpdate({ _id }, { obj });
    } catch (error) {
      return error.message;
    }
  }
}

export default new Users();
