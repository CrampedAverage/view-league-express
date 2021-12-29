const RiotAPI = require("../api/RiotAPI");
const game_summary = require("../dto/game_summary");
const queueType = require("../util/queueType");
const apiResponseValidation = require("./errorValidation");

class Games {
  constructor(puuid, continent) {
    this.puuid = puuid;
    this.continent = continent;
    this.getGameSummary = this.#getGameSummary.bind(this);
  }

  /**
   * Returns a list of matches from the users match history
   * @param {Number} numberOfGames number of games to show in history
   * @return list of detailed match
   **/
  async getMatches(numberOfGames = 10) {
    let data = []
    try {
      const rawDataMatches = await RiotAPI.matches(
        this.continent,
        this.puuid,
        numberOfGames
      );

      if (rawDataMatches.status)
        throw apiResponseValidation(
          rawDataMatches.status.status_code,
          "game_ids"
        );


      for (let i = 0; i < rawDataMatches.length; i++) {
        let gameData = await this.getGameSummary(rawDataMatches[i])
        data.push(gameData)
      }

    } catch (err) {
      console.log(err)
    }
    
    return data;
  }
  /**
   *
   * @param {uuid} matchId
   * @returns Formatted game summary object
   */
  async #getGameSummary(matchId) {
    let data;
    try {
      const rawGameInfo = await RiotAPI.match(this.continent, matchId);
      const { metadata, info } = rawGameInfo;
      if (!rawGameInfo) throw {msg: 'Undefined game data', api: "game_info"}
      if (rawGameInfo.status)
      throw apiResponseValidation(
        rawGameInfo.status.status_code,
        "game_info"
      );

      const gameType = await queueType(info.queueId);

      const playerIndex = metadata.participants.findIndex(
        (id) => id === this.puuid
      );

      data = game_summary(info, playerIndex, gameType);
    } catch (err) {
      data.error = err
    }

    return data;
  }

  async matchesInfo(matchList) {
    let gameInfo = await Promise.all(matchList.matches.map(this.getGameInfo));

    const version = await Promise.all(
      matchList.matches.map(RiotAPI.getVersion)
    );

    return {
      version,
      gameInfo,
    };
  }
}

module.exports = Games;
