import sendMail from "../middlewares/sender.js";
import admin from "../models/adim.Modul.js";
import users from "../models/users.Modul.js";
import { SIGN } from "../util/jwt.js";
import fs from "fs";
class Login {
  async login(req, res) {
    try {
      const { code, email } = req.body;
      let data = await JSON.parse(
        fs.readFileSync(process.cwd() + "/password.json", "utf-8")
      );
      if (data.length == 0) return res.send("malumot yo'q");
      for (let k of data) {
        let arr = data.filter((e) => e.email != email);
        if (k.email == email && code == k.password) {
          fs.writeFileSync("./password.json", JSON.stringify(arr));
          res.send({
            status: 200,
            Token: SIGN(email, "1111"),
          });
        } else {
          return res.send({
            status: 404,
            Token: null,
            message: "code yoki emali xato",
          });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  async Password(req, res) {
    try {
      let { email, contact } = req.body;
      if (email && contact) {
        let user = await admin.select(null, { email, contact });
        let usersNam = await users.select(null, { email });
        if (user.length != 0 || usersNam.length != 0) {
          const text = "Asslomu alekum";
          let code = Math.floor(Math.random() * 9000 + 1000);
          let send = await sendMail(email, text, code);
          if (!send) return res.send("bunday email topilmadid");
          let data = await JSON.parse(
            fs.readFileSync(process.cwd() + "/password.json", "utf-8")
          );
          let obj = { email, password: code };
          data.push(obj);
          fs.writeFileSync("./password.json", JSON.stringify(data));
          await res.send(email + " gmailga habar yuborildi ");
        } else
          res.send("siz kira olmaysiz siz bizngim malumotalrim ichia yo'q siz");
      } else res.send("malumot yo'q");
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default new Login();
