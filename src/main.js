const browserLoading = require('./utils/load.js')
const settingsManager = require('./settingsManager.js');
const notesManager = require('./notesManager');
const scalesManager = require('./scalesManager');
const UIManager = require('./UIManager');
const games = require('./games/games.js');
const scalePlayer = require('./games/scalePlayer.js');

(async function main() {
    await browserLoading;
    const uiManager = new UIManager();
    while (true){
        await games.playAllScalesInOrder();
    }
})();

