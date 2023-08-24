import express from "express";
import fileUpload from "express-fileupload";
import "./db/mongo.js";
import { adminRouters } from "./routers/adim.routes.js";
import { departmentsRouters } from "./routers/departments.routes.js";
import { loginRouters } from "./routers/login.routes.js";
import { directionsRouters } from "./routers/directions.routes.js";
import { positionsRouters } from "./routers/positions.routes.js";
import { groupsRouters } from "./routers/groups.routes.js";
import { usersRouters } from "./routers/users.routes.js";
import { cheksRouters } from "./routers/checks.routes.js";
import { incomesRouters } from "./routers/Incomes.routes.js";
import { outlayRouters } from "./routers/outlay.routes.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());


app.use("/admin", adminRouters);
app.use("/department", departmentsRouters);
app.use("/login", loginRouters);
app.use("/directions", directionsRouters);
app.use("/positions", positionsRouters);
app.use("/groups", groupsRouters);
app.use("/users", usersRouters);
app.use("/checks", cheksRouters);
app.use("/incomes", incomesRouters);
app.use("/outlay", outlayRouters);

app.listen(PORT);
console.log("server " + PORT);
