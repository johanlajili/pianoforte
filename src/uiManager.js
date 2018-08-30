const settingsManager = require('./settingsManager');

class UIManager {
    constructor() {
        this.expandElement = document.querySelector('.expand');
        this.solfegeElement = document.querySelector('.solfege');
        this.englishElement = document.querySelector('.english');
        this.expandElement.addEventListener('click', () => {
            document.body.parentElement.webkitRequestFullscreen();
        });
        this.updateNoteLanguage();
        this.solfegeElement.addEventListener('click', () => {
            if (settingsManager.noteLanguage === 'english') {
                settingsManager.updateSetting('noteLanguage', 'solfege');
                this.updateNoteLanguage();
            }
        });
        this.englishElement.addEventListener('click', () => {
            if (settingsManager.noteLanguage === 'solfege') {
                settingsManager.updateSetting('noteLanguage', 'english');
                this.updateNoteLanguage();
            }
        });
    }

    updateNoteLanguage() {
        const language = settingsManager.noteLanguage;
        this.solfegeElement.className = 'ui-button solfege ghost';
        this.englishElement.className = 'ui-button english ghost';
        const selectedElement = document.querySelector(`.ui-button.${language}`);
        selectedElement.className = selectedElement.className.replace('ghost', 'selected');
    }
}

module.exports = UIManager;
