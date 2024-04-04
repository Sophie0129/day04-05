const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded());

const router = require("./src/routers/router")(app)
//두번재 괄호는 해당 변수를 같이 보낼때 사용.
app.use("/", router)

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.listen(3000, () => console.log("3000 server"));
