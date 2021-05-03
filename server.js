require("dotenv").config();
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const regions = ["na", "euw"];
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

// This middleware handles the render of the first page
app.use(`/:id`, urlencodedParser, require("./routes/homepageHandler"));

// The second middleware will fetch the champions from the
// ./routes/api/champions then render it
app.use(`/:id/champions`, require("./routes/champageHandler"));

// This middlware will be used when the user enters a random route
app.use(`/:id/player/:id`, require("./routes/playerpageHandler"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
