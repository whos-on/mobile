const getInitials = (name) => {
    let initials;
    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
};

export const getColorFromStatus = (status) => {
    if(status === "Online"){
        return "#006400"
    }
    else if(status === "Offline"){
        return "#808080"
    }
    return "#FFD700"
}

export const getStatusMessage = (status, time) => {
    if(status === "Offline"){
        let date = new Date(time);
        let dateString = date.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric"})
        console.log(time + "   " + dateString)
        return "Last Online " + dateString;
        //return "Last Online " + time;
    }
    if(status === "Online"){
        return "Online"
    }
    else return "Away"
}

export const userToBgColor = (user) => {
    const f = user.firstName?.[0].toLowerCase().charCodeAt(0)
    const l = user.lastName?.[0].toLowerCase().charCodeAt(0)
    const id = parseInt(user?.id || NaN, 16) || 0 // ids = 12 byte hex strings
    const a = "a".charCodeAt(0)
    const z = "z".charCodeAt(0)

    if (!f || !l || !id) return "hsl(0,100%,40%)"

    const hueRangeMax = 360
    const b = z - a + 1                 // base
    const oldMin = z - a + 2            // lower bound (26)
    const oldMax = (z - a + 1) * b + b  // upper bound (702)

    // Get unique permutation using a 2-term polynomial
    let ret = (f - a + 1) * b + l - a + 1 - oldMin
    ret = Math.floor(ret * (hueRangeMax / (oldMax - oldMin))) // Clamp range
    // Use id's to offset hue, so that users with the same initials have
    // different colors (but still deterministic)
    ret -= Math.max(Math.min(Math.floor(Math.sin(id) * 100), hueRangeMax), 0)
    ret = (ret + 360) % 360 // Clamp again (in case of negative)

    return `hsl(${ ret },100%,40%)` // Just do hsl for CSS (no hsl->rgb->hex)
}