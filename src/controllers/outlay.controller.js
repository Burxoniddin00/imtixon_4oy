import adim from "../models/adim.Modul.js";
import outlay from "../models/outlay.Modul.js";
import user from "../models/users.Modul.js";
import positions from "../models/positions.Modul.js";
import { VERIFY } from "../util/jwt.js";

class Outlay {
  async get(req, res) {
    try {
      const id = req.params?.id;
      let data = await outlay.select();
      if (id) {
        data = await outlay.select(id);
      }
      res.send(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async post(req, res) {
    try {
      const token = req.headers?.token;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        let use = await user.select(null, { email: tok.token });

        if (users) {
          const { reason, amount } = req.body;
          if (reason && amount) {
            let obj = await outlay.insert(req.body);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else if (use.length != 0) {
          let posUsers = await positions.select(use[0].pos_ref_id._id);
          if (posUsers.pos_name == "Students") {
            const { reason, amount } = req.body;
            if (reason && amount) {
              let obj = await outlay.insert(req.body);
              res.send(obj);
            } else return res.send("maulot to'liq emas");
          } else
            return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
  async put(req, res) {
    try {
      const token = req.headers?.token;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        let use = await user.select(null, { email: tok.token });
        const id = req.params?.id;
        if (users.length != 0 || use.length != 0) {
          const { reason, user_ref_id, amount } = req.body;
          if (reason || user_ref_id || amount) {
            let data = await outlay.select(id);
            if (data.length == 0) return res.send("bunday malumot yo'q");
            data.reason = reason || data.reason;
            data.user_ref_id = user_ref_id || data.user_ref_id;
            data.amount = amount || data.amount;
            let obj = await outlay.updet(id, data);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Outlay();
