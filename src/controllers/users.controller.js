import adim from "../models/adim.Modul.js";
import user from "../models/users.Modul.js";
import grop from "../models/groups.Modul.js";
import positions from "../models/positions.Modul.js";
import Checks from "../models/checks.Modul.js";

import { VERIFY } from "../util/jwt.js";
class Users {
  async get(req, res) {
    try {
      const token = req.headers?.token;
      const id = req.params?.id;
      const {
        pos_ref_id,
        group_ref_id,
        gender,
        onsite,
        first_name,
        group,
        contact,
      } = req.query;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        let use = await user.select(null, { email: tok.token });
        if (users.length != 0) {
          let data = await user.select();
          if (pos_ref_id) {
            data = await user.select(null, { pos_ref_id });
          } else if (group_ref_id) {
            data = await user.select(null, { group_ref_id });
          } else if (first_name) {
            data = await user.select(null, { first_name });
          } else if (gender) {
            data = await user.select(null, { gender });
          } else if (contact) {
            let co = contact.split(" ");
            data = await user.select(null, {
              contact: `+${co[co.length - 1]}`,
            });
          } else if (id) {
            let ress = await user.select(id);
            if (ress) {
              data = ress;
            }
          } else if (group) {
            let g = await grop.select(null, { gr_number: group });
            if (g.length == 0) return res.send("bunday malumaot yoq");
            if (g) {
              data = g;
            } else res.send("malumot yo'q");
          }
          res.send(data);
        } else if (use.last_name != 0) {
          let posUsers = await positions.select(use[0].pos_ref_id._id);
          if (
            posUsers.pos_name == "Students" ||
            posUsers.pos_name == "Teache"
          ) {
            let data = await user.select(null, { email: tok.token });
            return res.send(data);
          } else return res.send("sizga malumotlarni bera olmaymiz");
        }
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
          const {
            pos_ref_id,
            first_name,
            last_name,
            gender,
            contact,
            email,
            group_ref_id,
          } = req.body;
          if (
            pos_ref_id &&
            first_name &&
            last_name &&
            gender &&
            contact &&
            email &&
            group_ref_id
          ) {
            let data = await user.select(null, { email, contact });
            if (data.length == 0) {
              let obj = await user.insert(req.body);
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
          const {
            pos_ref_id,
            first_name,
            last_name,
            gender,
            contact,
            email,
            group_ref_id,
          } = req.body;
          if (
            pos_ref_id ||
            first_name ||
            last_name ||
            gender ||
            contact ||
            email ||
            group_ref_id
          ) {
            let data = await user.select(id);
            if (data.length == 0) return res.send("bunday malumot yo'q");
            data.first_name = first_name || data.first_name;
            data.last_name = last_name || data.last_name;
            data.gender = gender || data.gender;
            data.contact = contact || data.contact;
            data.email = email || data.email;
            data.group_ref_id = group_ref_id || data.group_ref_id;
            let obj = await user.updet(id, data);
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
            let data = await user.select(id);
            if (data.length == 0) return res.send("bunday malumot bor");
            let obj = await user.delete(id);
            res.send(obj);
          } else return res.send("maulot to'liq emas");
        } else return res.send("siz malumot qo'sha olmaysiz siz admin emasiz");
      } else return res.send("token yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Users();
