
// tyreSystem.js - sistema simplificado porém realista de pneus e desgaste
const TyreCompounds = {
    SOFT:   { name: "Soft",   code: "S", color: "red",   baseDeg: 0.050, tempIdeal: 105, tempRange: 18 },
    MEDIUM: { name: "Medium", code: "M", color: "yellow",baseDeg: 0.035, tempIdeal: 100, tempRange: 16 },
    HARD:   { name: "Hard",   code: "H", color: "white", baseDeg: 0.025, tempIdeal: 95,  tempRange: 14 },
    INTER:  { name: "Inter",  code: "I", color: "green", baseDeg: 0.040, tempIdeal: 90,  tempRange: 18 },
    WET:    { name: "Wet",    code: "W", color: "blue",  baseDeg: 0.060, tempIdeal: 80,  tempRange: 20 }
};

var weatherState = {
    trackTemp: 32,
    rainLevel: 0
};

function createTyreSet(compoundKey) {
    const comp = TyreCompounds[compoundKey] || TyreCompounds.MEDIUM;
    return {
        compoundKey: compoundKey,
        compound: comp,
        wear: 0,
        temp: comp.tempIdeal,
        laps: 0
    };
}

function updateTyresForLap(tyreSet, drivingStyle, setupEffect) {
    var comp = tyreSet.compound;
    var baseDeg = comp.baseDeg;
    var tempFactor = 1.0 + Math.max(0, (weatherState.trackTemp - 30)) * 0.015;

    var rainPenalty = 1.0;
    if (weatherState.rainLevel === 1 && (comp.code === "S" || comp.code === "M" || comp.code === "H")) {
        rainPenalty = 2.0;
    } else if (weatherState.rainLevel === 2 && (comp.code === "S" || comp.code === "M" || comp.code === "H")) {
        rainPenalty = 3.0;
    }

    var degThisLap = baseDeg * drivingStyle * setupEffect * tempFactor * rainPenalty;
    tyreSet.wear += degThisLap * 100;
    if (tyreSet.wear > 100) tyreSet.wear = 100;
    tyreSet.laps += 1;

    tyreSet.temp += (drivingStyle - 1.0) * 8 + (weatherState.trackTemp - comp.tempIdeal) * 0.2;

    var wearPenalty = (tyreSet.wear / 100) * 2.5;
    var tempDiff = Math.abs(tyreSet.temp - comp.tempIdeal);
    var tempPenalty = 0;
    if (tempDiff > comp.tempRange) {
        tempPenalty = (tempDiff - comp.tempRange) * 0.05;
    }

    var compoundRainPenalty = 0;
    if (rainPenalty > 1.5 && (comp.code === "S" || comp.code === "M" || comp.code === "H")) {
        compoundRainPenalty = 3.0;
    }

    return wearPenalty + tempPenalty + compoundRainPenalty;
}
