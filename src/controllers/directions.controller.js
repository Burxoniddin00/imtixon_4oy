import adim from "../models/adim.Modul.js";
import directions from "../models/directions.Modul.js";
import { VERIFY } from "../util/jwt.js";
class Directions {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const { dep_ref_id, dir_name } = req.query;
      let data = await directions.select();
      if (dep_ref_id) {
        data = await directions.select(null, { dep_ref_id });
      } else if (id) {
        let ref_id = await directions.select(id);
        if (ref_id) {
          data = await directions.select(id);
        } else res.send("bunday Idlik malumot yoq");
      } else if (dir_name) {
        data = await directions.select(null, { dir_name });
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
          const { dep_ref_id, dir_name, duration, salary } = req.body;
          if (dep_ref_id && dir_name && duration && salary) {
            let data = await directions.select(null, { dir_name });
            if (data.length == 0) {
              let obj = await directions.insert(req.body);
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
          const { dep_ref_id, dir_name, duration, salary } = req.body;
          if (dep_ref_id || dir_name || duration || salary) {
            let data = await directions.select(id);
            if (data.length == 0) return res.send("bunday malumot yo'q");
            data.dep_ref_id = dep_ref_id || data.dep_ref_id;
            data.dir_name = dir_name || data.dir_name;
            data.duration = duration || data.duration;
            data.salary = salary || data.salary;
            let obj = await directions.updet(id, data);
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
            let data = await directions.select(id);
            if (data.length == 0) return res.send("bunday malumot bor");
            let obj = await directions.delete(id);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Directions();
