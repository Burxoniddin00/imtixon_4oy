import adim from "../models/adim.Modul.js";
import positions from "../models/positions.Modul.js";
import { VERIFY } from "../util/jwt.js";
class Positions {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const token = req.headers?.token;
      const { dep_ref_id, pos_name } = req.query;
      let data = await positions.select();
      if (dep_ref_id) {
        data = await positions.select(null, { dep_ref_id });
      } else if (id) {
        data = await positions.select(id);
      } else if (pos_name) {
        data = await positions.select(null, { pos_name });
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
        if (users) {
          const { dep_ref_id, pos_name } = req.body;
          if (dep_ref_id && pos_name) {
            let data = await positions.select(null, { pos_name });
            if (data.length == 0) {
              let obj = await positions.insert(req.body);
              res.send(obj);
            } else if (data) return res.send("bunday malumot bor");
          } else return res.send("maulot to'liq emas");
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
        const id = req.params?.id;
        if (users) {
          const { dep_ref_id, pos_name, salary } = req.body;
          if (dep_ref_id || pos_name || salary) {
            let data = await positions.select(id);
            if (data.length == 0) return res.send("bunday malumot yo'q");
            data.dep_ref_id = dep_ref_id || data.dep_ref_id;
            data.pos_name = pos_name || data.pos_name;
            data.salary = salary || data.salary;
            let obj = await positions.updet(id, data);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
  async delet(req, res) {
    try {
      const token = req.headers?.token;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        const id = req.params?.id;
        if (users) {
          if (id) {
            let data = await positions.select(id);
            if (data.length == 0) return res.send("bunday malumot bor");
            let obj = await positions.delete(id);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Positions();
