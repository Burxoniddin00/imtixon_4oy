import Checks from "../models/checks.Modul.js";
import adim from "../models/adim.Modul.js";
import { VERIFY } from "../util/jwt.js";
import user from "../models/users.Modul.js";
import positions from "../models/positions.Modul.js";

class ChecksControler {
  async get(req, res) {
    try {
      const id = req.params?.id;
      const token = req.headers?.token;
      let data;
      if (token) {
        const tok = VERIFY(token, "1111");
        const admin = await adim.select(null, { email: tok.token });
        const users = await user.select(null, { email: tok.token });
        if (admin.length != 0 || users.length != 0) {
          if (users.length != 0) {
            let posUsers = await positions.select(users[0].pos_ref_id);
            if (posUsers.pos_name == !"Teache")
              return res.send("siz malumot ola olmiszi");
          }
          data = await Checks.select();
        } else return res.send("token yoq ");
      } else if (id) {
        data = await Checks.select(id);
      }
      res.send(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async post(req, res) {
    try {
      const { user_ref_id, gr_ref_id, not_in_class } = req.body;
      const token = req.headers?.token;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        const usersName = await user.select(null, { email: tok.token });
        if (users.length == 0 || usersName.length == 0)
          return res.send("siz admin emasiz");
        else if (users || usersName) {
          if (usersName) {
            let posUsers = await positions.select(usersName[0].pos_ref_id);
            if (posUsers.pos_name == !"Teache")
              return res.send("siz malumot ola olmiszi");
          }
          if (user_ref_id && gr_ref_id && not_in_class) {
            let data = await Checks.insert(req.body);
            res.send(data);
          } else return res.send("malumotni to'q toldring");
        }
      } else res.send("sizda token yo'q siz token olishingz kerek");
    } catch (error) {
      console.log(error.message);
    }
  }
  async delete(req, res) {
    try {
      const token = req.headers?.token;
      const id = req.params?.id;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        if (users.length == 0) return res.send("siz admin emasiz");
        else if (users) {
          if (id) {
            let user = await Checks.select(id);
            if (user.length == 0) return res.send("bunday malumot bor");
            else if (user) {
              let user = await Checks.delete(id);
              res.send(user);
            }
          } else return res.send("malumotni to'q toldring");
        }
      } else res.send("sizda token yo'q siz token olishingz kerek");
    } catch (error) {
      console.log(error.message);
    }
  }
  async put(req, res) {
    try {
      const { user_ref_id, gr_ref_id, not_in_class } = req.body;
      const token = req.headers?.token;
      if (token) {
        const id = req.params?.id;
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        const use = await user.select(null, { email: tok.token });
        if (use.length == 0) return res.send("siz admin emasiz");
        else if (users || use) {
          if (use.length != 0 || users.length != 0) {
            let posUsers = await positions.select(use[0].pos_ref_id);
            if (posUsers.pos_name == !"Teache")
              return res.send("siz malumot ola olmiszi");
          }
          if (user_ref_id || gr_ref_id || not_in_class) {
            let user = await Checks.select(id);
            if (user) {
              user.user_ref_id = user_ref_id || user.user_ref_id;
              user.gr_ref_id = gr_ref_id || user.gr_ref_id;
              user.not_in_class = not_in_class || user.not_in_class;
              let data = await Checks.updet(id, user);
              res.send(data);
            } else res.send("bunday id malumot yo'q");
          } else return res.send("malumotni to'q toldring");
        }
      } else res.send("sizda token yo'q siz token olishingz kerek");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new ChecksControler();
