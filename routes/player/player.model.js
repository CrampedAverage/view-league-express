// router.get("/:player-id", async (req, res, next) => {
//   
//   path = req.originalUrl.split("/")[3];
//   region = req.originalUrl.split("/")[1];
//   if (!(region in regionObj.regions)) {
//       res.redirect("/error");
//   }
//   regionCode = regionObj.regions[region];
//   summonerName = decodeURI(path);
//   try {
//       // Verify if user is found
//       const passedData = await riotAPI.summonerID(regionCode, summonerName);
//       if (passedData.status) {
//           switch (passedData.status.status_code) {
//               case 429:
//                   throw "Rate Limit Exceeded";
//               case 404:
//                   throw "User Not Found";
//               default:
//                   throw "Error";
//           }
//       }

//       limitReached = false;
//       found = true;
//       // Retrieves user Rank Pofile

//       userInfo = await riotAPI.getUserRank(passedData.id);
//       userInfo.wr = LeagueStats.getWinrate(userInfo.wins, userInfo.losses);
//       userInfo.tier = LeagueStats.capitaliseWord(userInfo.tier);
//       userInfo.icon = passedData.profileIconId;

//       // Retrives the match history
//       const matches = await riotAPI
//           .matches(regionCode, passedData.accountId, 10)
//           .then((match) => match);
//       if (matches) {
//           const user = await new Process(passedData.accountId);
//           const processedMatchInfo = await user.matchesInfo(matches);
//           games = Object.values(await processedMatchInfo);
//           for (let i = 0; i < games[0].length; i++) {
//               let version = games[0][i];
//               let gameStats = games[1][i];
//               games[0][i] = { version, gameStats };
//           }
//           games = games[0];
//       }
//   } catch (err) {
//       if (err === "Rate Limit Exceeded") {
//           limitReached = true;
//       }
//       if (err === "User Not Found") {
//           found = false;
//       }
//   }
//   next();
// });

const playerInfoMiddleware = async (req, res, next) => {
  const summonerName = req.params.id
  const region = req.cookies.region
  const regionCode = regionObj.regions[region];


  try {
      // Verify if user is found
      const passedData = await riotAPI.summonerID(regionCode, summonerName);
      if (passedData.status) {
          switch (passedData.status.status_code) {
              case 429:
                  throw "Rate Limit Exceeded";
              case 404:
                  throw "User Not Found";
              default:
                  throw "Error";
          }
      }

      const limitReached = false;
      let found = true;
      // Retrieves user Rank Pofile

      let userInfo = await riotAPI.getUserRank(passedData.id);
      userInfo.wr = LeagueStats.getWinrate(userInfo.wins, userInfo.losses);
      userInfo.tier = LeagueStats.capitaliseWord(userInfo.tier);
      userInfo.icon = passedData.profileIconId;

      // Retrives the match history
      const matches = await riotAPI
          .matches(regionCode, passedData.accountId, 10)
          .then((match) => match);
      if (matches) {
          const user = await new Process(passedData.accountId);
          const processedMatchInfo = await user.matchesInfo(matches);
          const games = Object.values(await processedMatchInfo);
          for (let i = 0; i < games[0].length; i++) {
              let version = games[0][i];
              let gameStats = games[1][i];
              games[0][i] = { version, gameStats };
          }
          games = games[0];
      }
  } catch (err) {
      if (err === "Rate Limit Exceeded") {
          limitReached = true;
      }
      if (err === "User Not Found") {
          found = false;
      }
  }
    next();
}

module.exports = playerInfoMiddleware;