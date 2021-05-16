class Time {
    static getTime(rawTime) {
        let mins = Math.floor(rawTime / 60);
        let secs = ((rawTime / 60) % 1) * 60;
        secs = Math.round(secs);
        let time = {
            mins,
            secs,
        };

        return time;
    }

    static getGameDate(gameCreatedTime) {
        let date = new Date(gameCreatedTime).toString();
        let time = date.split(" ").slice(4, 5).toString();
        date = date.split(" ").slice(1, 5);
        date = date.toString();
        date = date.replace(/,/g, " ");
        date = date.replace(time, this.convertTime(time));

        return date;
    }

    static convertTime(time) {
        // Check correct time format and split into components
        time = time
            .toString()
            .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            // If time format correct
            time = time.slice(1); // Remove full string match value
            time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }

        return time.join(""); // return adjusted time or original string
    }

    static calcDiff(gameCreatedTime, gameLength) {
        let gameTime = new Date(gameCreatedTime + gameLength).getTime();
        let currTime = new Date().getTime();
        let diff = currTime - gameTime;
        diff /= 60000;
        diff = parseFloat(diff.toFixed(0));
        let msg;

        if (diff < 60) {
            msg = `${diff} minutes ago`;
            return msg;
        }
        if (diff < 120) {
            msg = "An hour ago";
            return msg;
        }
        if (diff < 1440) {
            msg = `${(diff / 60).toFixed(0)} hours ago`;
            return msg;
        }
        if (diff < 43800) {
            msg = `${(diff / 1440).toFixed(0)} days ago`;
            return msg;
        }
        msg = msg = `${(diff / 43200).toFixed(0)} months ago`;
        return msg;
    }
}

module.exports = Time;
