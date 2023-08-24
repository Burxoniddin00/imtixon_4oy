import adim from "../models/adim.Modul.js";
import incomes from "../models/incomes.Modul.js";
import user from "../models/users.Modul.js";
import positions from "../models/positions.Modul.js";

import { VERIFY } from "../util/jwt.js";

class Incomes {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const { dep_ref_id, dir_name } = req.query;
      let data = await incomes.select();
      if (dep_ref_id) {
        data = await incomes.select(null, { dep_ref_id });
      } else if (id) {
        let ref_id = await incomes.select(id);
        if (ref_id) {
          data = await incomes.select(id);
        } else res.send("bunday Idlik malumot yoq");
      } else if (dir_name) {
        data = await incomes.select(null, { dir_name });
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
        if (users.length != 0 || use) {
          const { reason, user_ref_id, amount } = req.body;
          if (reason && user_ref_id && amount) {
            let obj = await incomes.insert(req.body);
            return res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else if (use.length != 0) {
          let posUsers = await positions.select(use[0].pos_ref_id._id);
          if (posUsers.pos_name == "Students") {
            const { reason, user_ref_id, amount } = req.body;
            if (reason && user_ref_id && amount) {
              let obj = await incomes.insert(req.body);
              return res.send(obj);
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
        if (users.length != 0) {
          const { reason, user_ref_id, amount } = req.body;
          if (reason || user_ref_id || amount) {
            let data = await incomes.select(id);
            if (data.length == 0) return res.send("bunday malumot yo'q");
            data.reason = reason || data.reason;
            data.user_ref_id = user_ref_id || data.user_ref_id;
            data.amount = amount || data.amount;
            let obj = await incomes.updet(id, data);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else if (use.length != 0) {
          let posUsers = await positions.select(use[0].pos_ref_id._id);
          if (posUsers.pos_name == "Students") {
            const { reason, user_ref_id, amount } = req.body;
            if (reason || user_ref_id || amount) {
              let data = await incomes.select(id);
              if (data.length == 0) return res.send("bunday malumot yo'q");
              data.reason = reason || data.reason;
              data.user_ref_id = user_ref_id || data.user_ref_id;
              data.amount = amount || data.amount;
              let obj = await incomes.updet(id, data);
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
}

export default new Incomes();
