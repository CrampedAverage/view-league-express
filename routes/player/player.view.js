const playerView = (userInfo, userMatches, req) => {
  const viewObj = {};
  if (!userInfo.found || userInfo.limitReached) {
    viewObj.location = 'noUser';
    viewObj.data = {
      title: `Not Found || viewLeague`,
      style: "",
      region: req.cookies.region,
    }
    viewObj.status = 404
    return viewObj
  } 


  viewObj.location = 'player'
  viewObj.data = {
    title: `${userInfo.summonerName} || viewLeague`,
    name: userInfo.summonerName,
    style: "player.css",
    games: userMatches,
    user: userInfo,
    region: req.cookies.region,
  };
  viewObj.status = 200
  return viewObj
}

module.exports = playerView