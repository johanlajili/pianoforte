class SettingsManager {
    constructor() {
        this.listeners = [];
        this.noteLanguage = 'english';
        this.scaleSize = 'doubleOctave';
        this.hintType = 'none';
        this.showFirst = false;
        const storedSettings = JSON.parse(localStorage.getItem('PianoForteSettings'));
        if (storedSettings) {
            for (const setting in storedSettings) {
                this[setting] = storedSettings[setting];
            }
        } else {
            this._updateLocalStorage();
        }
    }

    subscribe(callback) {
        this.listeners.push(callback);
    }

    updateSetting(settingName, settingValue) {
        this[settingName] = settingValue;
        this._updateLocalStorage();
        this._callSubscribers();
    }

    _callSubscribers() {
        this.listeners.forEach(subscriber => subscriber());
    }

    _updateLocalStorage() {
        localStorage.setItem('PianoForteSettings', JSON.stringify({
            noteLanguage: this.noteLanguage,
            scaleSize: this.scaleSize,
            hintType: this.hintType
        }));
    }
}

module.exports = new SettingsManager();
