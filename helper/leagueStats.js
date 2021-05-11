class LeagueStats {

    static getKDA(kills, assists, deaths) {
        let kda = kills + assists
        kda = kda / deaths
        kda = kda.toFixed(2)
        kda = parseFloat(kda)

        return kda
    }

    static getCSPM(cs, rawTime) {
        let cspm = cs / (rawTime/60)

        cspm = cspm.toFixed(1)
        cspm = parseFloat(cspm)

        return cspm
    }
    
    static getKPA(kills, totalKills) {
        let kpa = (kills / totalKills) * 100
        kpa = kpa.toFixed(0)
        kpa = parseFloat(kpa)

        return kpa
    }



    static getTotalKills(match, playerInfo) {
        const totalTeamKills = match.participants.map(player => {
            if (playerInfo.teamId == player.teamId) {
                return player.stats.kills
            }
            return 0
        })
        const totalKills = totalTeamKills.reduce((acc, cur) => acc + cur)
    

        return totalKills
    }
}   


module.exports = LeagueStats