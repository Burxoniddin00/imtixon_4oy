import adminModul from "../schemas/adimin.Schema.js";
import { Types } from "mongoose";

class Admin {
  async select(id, filter, option) {
    try {
      if (id) return await adminModul.findById(id, option);
      return await adminModul.find(filter, option);
    } catch (error) {
      return error.message;
    }
  }
  async updet(id, obj) {
    return await adminModul.findByIdAndUpdate(id, obj);
  }
}


export default new Admin();
