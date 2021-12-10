require("dotenv").config();
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const routes = require("./routes");


const hbs = exphbs.create({
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    layout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
});
const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
    }
}

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

app.use("/error", (req, res) => {
    res.send("123");
});

routes(app, { urlencodedParser, jsonParser });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
