import { Types } from "mongoose";
import groupsModul from "../schemas/groups.schema.js";

class Groups {
  async select(id, filter, option) {
    try {
      if (id)
        return await groupsModul.findById(id, option).populate("dir_ref_id");
      return await groupsModul.find(filter, option).populate("dir_ref_id");
    } catch (error) {
      return error.message;
    }
  }
  async insert(body) {
    try {
      return await groupsModul.create(body);
    } catch (error) {
      return error.message;
    }
  }
  async delete(id) {
    return await groupsModul.updateOne(
      { _id: new Types.ObjectId(id) },
      { end_date: Date.now() },
      { upsert: true }
    );
  }
  async updet(_id, obj) {
    try {
      return await groupsModul.findByIdAndUpdate({_id}, {obj});
    } catch (error) {
      return error.message;
    }
  }
}

export default new Groups();
