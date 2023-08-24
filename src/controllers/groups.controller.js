import adim from "../models/adim.Modul.js";
import groups from "../models/groups.Modul.js";
import user from "../models/users.Modul.js";
import positions from "../models/positions.Modul.js";
import { VERIFY } from "../util/jwt.js";
class Groups {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const token = req.headers?.token;
      const { dir_ref_id, gr_number } = req.query;
      if (token) {
        const tok = VERIFY(token, "1111");
        const admin = await adim.select(null, { email: tok.token });
        const userGrup = await user.select(null, { email: tok.token });
        if (admin.length != 0 || userGrup.length != 0) {
          if (userGrup.length != 0) {
            let posUsers = await positions.select(userGrup[0].pos_ref_id);
            if (
              posUsers.pos_name == !"Students" ||
              posUsers.pos_name == !"Teache"
            )
              return res.send("siz malumot ola olmiszi");
          }
          let data = await groups.select();
          if (dir_ref_id) {
            data = await groups.select(null, { dir_ref_id });
          } else if (id) {
            let rw_id = await groups.select(id);
            if (rw_id) {
              data = await groups.select(id);
            } else if (String(rw_id))
              return res.send("bunday Idlik malumot yoq");
          } else if (gr_number) {
            data = await groups.select(null, { gr_number });
          }
          res.send(data);
        }
        return res.send("siz malumotlarni ola olmaysiz");
      }
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
          const { dir_ref_id, gr_number } = req.body;
          if (dir_ref_id && gr_number) {
            let data = await groups.select(null, { gr_number });
            if (data.length == 0) {
              let obj = await groups.insert(req.body);
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
          const { dir_ref_id, gr_number } = req.body;
          if (dir_ref_id || gr_number ) {
            let data = await groups.select(id);
            if (data.length == 0) return res.send("bunday malumot yo'q");
            data.dir_ref_id = dir_ref_id || data.dir_ref_id;
            data.gr_number = gr_number || data.gr_number;
            let obj = await groups.updet(id, data);
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
            let data = await groups.select(id);
            if (data.length == 0) return res.send("bunday malumot bor");
            let obj = await groups.delete(id);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Groups();
