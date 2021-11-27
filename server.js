require("dotenv").config();
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const regions = {
    euw: "euw1",
    eune: "eun1",
    na: "na1",
    jp: "jp1",
    lan: "la1",
    las: "la2",
    oce: "oc1",
    kr: "kr",
    ru: "ru1",
    tr: "tr1",
    br: "br1",
};
let region;
module.exports = { region, regions };

const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    layout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
});

// create application/json parser
let jsonParser = express.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = express.urlencoded({ extended: false, limit: "20mb" });

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use("/", urlencodedParser, require("./middleware/homeAction"));

app.use("/error", (req, res) => {
    res.send("hehe");
});

// This middleware handles the render of the first page
app.use(`/:id`, urlencodedParser, require('./routes/home/home.controller'));

// The second middleware will fetch the champions from the
// ./routes/api/champions then render it
app.use(`/:id/champions`, require('./routes/champions/champions.controller'));

// This middlware will be used when the user searches a player
app.use(`/:id/player/:id`, require("./routes/player/player.controller"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
