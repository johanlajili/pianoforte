const scalesManager = require('../scalesManager');
const scalePlayer = require('./scalePlayer');
const render = require('../render');
const sleep = require('../utils/sleep');

async function playAllScalesInOrder() {
    for (let scaleId of scalesManager.getScaleList()) {
        const rightHandScale = scalesManager.getScale(scaleId, 'rightHand', 'None');
        render.renderQuestion(`Play the ${rightHandScale.name}, right hand`);
        await scalePlayer.playOneScaleBackAndForth(rightHandScale);
        const leftHandScale = scalesManager.getScale(scaleId, 'leftHand', 'None');
        render.renderQuestion(`Play the ${leftHandScale.name}, left hand`);
        await scalePlayer.playOneScaleBackAndForth(leftHandScale);
    }
}

async function blackQuiz() {
    for (let scaleId of scalesManager.getRandomizedScaleList()) {
        const scale = scalesManager.getScale(scaleId, undefined, 'OnlyBlacks');
        render.renderQuestion(`What are the black keys of ${scale.name}`)
        let result = null;
        do {
            result = await scalePlayer.playOneScale(scale);
        } while (result.completion !== 'finished');
        await sleep(500);
    }
}

module.exports = {
    playAllScalesInOrder,
    blackQuiz,
}
