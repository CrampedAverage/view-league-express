const champions = require("./champions/champions.controller");
// const player = require("./player/player.controller");
const home = require("./home/home.controller");

function routes(app, { urlencodedParser }) {
  app.use("/champions", champions);
  // app.use("/player", urlencodedParser, player);
  app.use("/", urlencodedParser, home);
}

module.exports = routes;
