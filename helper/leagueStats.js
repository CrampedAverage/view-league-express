class LeagueStats {
    /**
     * LeagueStats - Method to calulcate Kills and Assists over Deaths
     * @param {Number} kills 
     * @param {Number} assists 
     * @param {String} deaths 
     * @returns {Number} KDA in 2 decimal points
     */
    static getKDA(kills, assists, deaths) {
        let kda = kills + assists;
        kda = kda / deaths;
        kda = kda.toFixed(2);
        kda = parseFloat(kda);

        return kda;
    }

    /**
     * LeagueStats - Method to calulcate Creep Score per Minute
     * @param {Number} cs 
     * @param {Number} rawTime 
     * @returns {Number} CSPM in 1 decimal point
     */
    static getCSPM(cs, rawTime) {
        let cspm = cs / (rawTime / 60);

        cspm = cspm.toFixed(1);
        cspm = parseFloat(cspm);

        return cspm;
    }

    /**
     * LeagueStats - Method to calculate total creep score
     * @param {Number} minionCS 
     * @param {Number} monsterCS 
     * @returns {Number} totalCS
     */
    static getCS(minionCS, monsterCS) {
        let totalCS = minionCS + monsterCS;
        
        return totalCS;
    }
    /**
     * LeagueStats - Method to calulcate Kills Participation
     * @param {Number} kills 
     * @param {Number} totalKills 
     * @param {Number} assists 
     * @returns {Number} KPA to 0 decimal points
     */
    static getKPA(kills, totalKills, assists) {
        let kpa = ((kills + assists) / totalKills) * 100;
        kpa = kpa.toFixed(0);
        kpa = parseFloat(kpa);

        return kpa;
    }

    /**
     * LeagueStats - Method to calculate Total Kills in player's team
     * @param {Number} match 
     * @param {Object} playerData 
     * @returns {Number} totalKills
     */
    static getTotalKills(match, playerData) {
        const totalTeamKills = match.participants.map((player) => {
            if (playerData.teamId == player.teamId) {
                return player.kills;
            }
            return 0;
        });
        const totalKills = totalTeamKills.reduce((acc, cur) => acc + cur);

        return totalKills;
    }

    /**
     * LeagueStats - Method to calculate the Winrate percentage
     * @param {Number} wins 
     * @param {Number} losses 
     * @returns {Number} wr
     */
    static getWinrate(wins, losses) {
        let wr = wins / (wins + losses);
        wr = wr * 100;
        wr = wr.toFixed(0);

        return wr;
    }
    /**
     * LeagueStats - Method to capitalise any word 
     * @param {String} word 
     * @returns {String} newWord
     */
    static capitaliseWord(word) {
        let newWord = word.toLowerCase();
        newWord = newWord.split("");
        newWord[0] = newWord[0].toUpperCase();
        newWord = newWord.join("");

        return newWord;
    }
}

module.exports = LeagueStats;
