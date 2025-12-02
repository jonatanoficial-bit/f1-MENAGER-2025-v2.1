
// pitStopSystem.js - sistema simples de pit-stop com tempo e possíveis erros

var pitConfig = {
    baseStop: 2.4,
    humanErrorChance: 0.08,
    slowStopExtra: 2.0,
    bigFailExtra: 8.0
};

function performPitStop(driver, newCompoundKey, frontWingAdjust) {
    var stopTime = pitConfig.baseStop;
    var errorDesc = null;

    var r = Math.random();
    if (r < pitConfig.humanErrorChance) {
        if (r < pitConfig.humanErrorChance * 0.5) {
            stopTime += pitConfig.slowStopExtra;
            errorDesc = "Parafuso preso em uma roda.";
        } else {
            stopTime += pitConfig.bigFailExtra;
            errorDesc = "Problema grave no pit! Erro de pneu ou ferramenta.";
        }
    }

    if (typeof frontWingAdjust === "number") {
        driver.frontWingSetting = (driver.frontWingSetting || 0) + frontWingAdjust;
    }

    if (typeof setDriverTyres === "function") {
        setDriverTyres(driver, newCompoundKey);
    }

    return {
        stopTime: stopTime,
        error: errorDesc
    };
}
