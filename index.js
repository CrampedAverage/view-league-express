require("dotenv").config();
const express = require("serverless-express/express");
const path = require("path");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const compression = require("compression");
const helmet = require("helmet");

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
app.use(
  helmet.contentSecurityPolicy({
    use: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(compression());
app.use(cookieParser());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/views"));

app.use("/error", (req, res) => {
  res.send("123");
});

routes(app, { urlencodedParser, jsonParser });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
