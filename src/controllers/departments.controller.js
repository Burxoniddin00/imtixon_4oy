import departments from "../models/departments.Modul.js";
import directionsModul from "../models/directions.Modul.js";
import positionsModul from "../models/positions.Modul.js";
import groups from "../models/groups.Modul.js";

import adim from "../models/adim.Modul.js";
import { VERIFY } from "../util/jwt.js";

class Departments {
  async get(req, res) {
    try {
      const { id, grup } = req.params;
      const { dep_name, directions, positions } = req.query;
      let data = await departments.select();
      if (id == "directions") {
        let data = await directionsModul.select();
        if (grup) {
          let rus = await groups.select(grup);
          if (rus) data = await groups.select(grup);
        }
        return res.send(data);
      } else if (id == "positions") {
        let data = await positionsModul.select();
        if (grup) {
          let rus = await groups.select(grup);
          if (rus) data = await groups.select(grup);
        }
        return res.send(data);
      } else if (id) {
        let resss = await departments.select(id);
        if (resss) {
          return res.send(await departments.select(id));
        } else res.send("bunday Idlik malumot yoq");
      } else if (dep_name) {
        let data = await departments.select(null, { dep_name });
        return res.send(data);
      } else if (directions) {
        let rus = await directionsModul.select(null, { dir_name: directions });
        console.log(directions);
        if (rus.length != 0) {
          return res.send(rus);
        } else return res.send("bunday malumot yo'q");
      } else if (positions) {
        let rus = await positionsModul.select(null, { pos_name: positions });
        if (rus.length != 0) {
          return res.send(rus);
        } else return res.send("bunday malumot yo'q");
      }
      res.send(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  async post(req, res) {
    try {
      const { dep_name, center_ref_id } = req.body;
      const token = req.headers?.token;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        if (users.length == 0) return res.send("siz admin emasiz");
        else if (users) {
          if (dep_name && center_ref_id) {
            let user = await departments.select(null, { dep_name });
            if (user.length == 0) {
              let data = await departments.insert(req.body);
              res.send(data);
            } else {
              return res.send("bunday malumot bor");
            }
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
            let user = await departments.select(id);
            if (user.length == 0) return res.send("bunday malumot bor");
            else if (user) {
              let user = await departments.delete(id);
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
      const { dep_name, center_ref_id } = req.body;
      const token = req.headers?.token;
      const id = req.query?.id;
      if (token) {
        const tok = VERIFY(token, "1111");
        let users = await adim.select(null, { email: tok.token });
        if (users.length == 0) return res.send("siz admin emasiz");
        else if (users) {
          if (dep_name || center_ref_id) {
            let user_id = await departments.select(id);
            if (user_id) {
              let user = await departments.select(null, { dep_name });
              if (user.length == 0) return res.send("bunday malumot bor");
              user.dep_name = dep_name || user.dep_name;
              user.center_ref_id = center_ref_id || user.center_ref_id;
              let data = await departments.updet(user[0]._id, user);
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

export default new Departments();
