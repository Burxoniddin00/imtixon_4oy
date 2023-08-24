import adimn from "../models/adim.Modul.js";
import departments from "../models/departments.Modul.js";
import groups from "../models/groups.Modul.js";
import { VERIFY } from "../util/jwt.js";

class Admin {
  async get(req, res) {
    try {
      const token = req.headers?.token;
      if (token) {
        const tok = VERIFY(token, "1111");
        const id = req.params?.id;
        let data = await adimn.select(null, { email: tok.token });
        if (data.length == 0) return res.send("siz kira olmaysiz");
        if (id) {
          data = await adimn.select(id);
        }
        res.send(data);
      } else res.send("token yoq");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Admin();
