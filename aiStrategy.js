
// aiStrategy.js - lógica simples de estratégia de pneus e pit para IA

function decideAiPit(driver, raceState) {
    if (!driver.tyreSet) return false;
    if (driver.dnf) return false;

    var wear = driver.tyreSet.wear || 0;
    var lapsOnTyre = driver.tyreSet.laps || 0;
    var lapsLeft = raceState.totalLaps - raceState.currentLap;

    if (wear > 70 && lapsLeft > 3) return true;

    if (driver.tyreSet.compoundKey === "SOFT" && lapsOnTyre > 12) return true;
    if (driver.tyreSet.compoundKey === "MEDIUM" && lapsOnTyre > 18) return true;
    if (driver.tyreSet.compoundKey === "HARD" && lapsOnTyre > 26) return true;

    if (typeof weatherState !== "undefined" && weatherState.rainLevel > 0 &&
        (driver.tyreSet.compoundKey === "SOFT" || driver.tyreSet.compoundKey === "MEDIUM" || driver.tyreSet.compoundKey === "HARD")) {
        return true;
    }

    return false;
}

function chooseNextCompoundForAi(driver, raceState) {
    var lapsLeft = raceState.totalLaps - raceState.currentLap;
    if (typeof weatherState !== "undefined" && weatherState.rainLevel === 1) {
        return "INTER";
    } else if (typeof weatherState !== "undefined" && weatherState.rainLevel === 2) {
        return "WET";
    }

    if (lapsLeft <= 8) return "SOFT";
    if (lapsLeft <= 16) return "MEDIUM";
    return "HARD";
}
