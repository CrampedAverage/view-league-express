class LeagueStats {
    static getKDA(kills, assists, deaths) {
        let kda = kills + assists;
        kda = kda / deaths;
        kda = kda.toFixed(2);
        kda = parseFloat(kda);

        return kda;
    }

    static getCSPM(cs, rawTime) {
        let cspm = cs / (rawTime / 60);

        cspm = cspm.toFixed(1);
        cspm = parseFloat(cspm);

        return cspm;
    }

    static getKPA(kills, totalKills, assists) {
        let kpa = ((kills + assists) / totalKills) * 100;
        kpa = kpa.toFixed(0);
        kpa = parseFloat(kpa);

        return kpa;
    }

    static getTotalKills(match, playerInfo) {
        const totalTeamKills = match.participants.map((player) => {
            if (playerInfo.teamId == player.teamId) {
                return player.stats.kills;
            }
            return 0;
        });
        const totalKills = totalTeamKills.reduce((acc, cur) => acc + cur);

        return totalKills;
    }

    static getWinrate(wins, losses) {
        let wr = wins / (wins + losses);
        wr = wr * 100;
        wr = wr.toFixed(0);

        return wr;
    }

    static capitaliseWord(word) {
        let newWord = word.toLowerCase();
        newWord = newWord.split("");
        newWord[0] = newWord[0].toUpperCase();
        newWord = newWord.join("");

        return newWord;
    }
}

module.exports = LeagueStats;
