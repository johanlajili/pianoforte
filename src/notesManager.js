/*
    notesManager
    responsible for exporting notes as variables.
*/
const settingsManager = require('./settingsManager.js');

class Note {
    constructor(solfegeName, englishName) {
        this.solfegeName = solfegeName;
        this.englishName = englishName;
    }
    toString() {
        const noteLanguage = settingsManager.noteLanguage;
        return this[`${noteLanguage}Name`];
    }
}


class NotesManager {
    constructor() {
        const noteLanguage = settingsManager.noteLanguage;
        const solfege = noteLanguage === "solfege";
        const C = this.C = new Note("Do", "C");
        const D = this.D = new Note("Ré", "D");
        const E = this.E = new Note("Mi", "E");
        const F = this.F = new Note("Fa", "F");
        const G = this.G = new Note("Sol", "G");
        const A = this.A = new Note("La", "A");
        const B = this.B = new Note("Si", "B");
        const Cf = this.Cf = this.Cb = new Note("Do♭", "C♭");
        const Df = this.Df = this.Db = new Note("Ré♭", "D♭");
        const Ef = this.Ef = this.Eb = new Note("Mi♭", "E♭");
        const Ff = this.Ff = this.Fb = new Note("Fa♭", "F♭");
        const Gf = this.Gf = this.Gb = new Note("Sol♭", "G♭");
        const Af = this.Af = this.Ab = new Note("La♭", "A♭");
        const Bf = this.Bf = this.Bb = new Note("Si♭", "B♭");
        const Cs = this.Cs = new Note("Do#,", "C#");
        const Ds = this.Ds = new Note("Ré#,", "D#");
        const Es = this.Es = new Note("Mi#,", "E#");
        const Fs = this.Fs = new Note("Fa#,", "F#");
        const Gs = this.Gs = new Note("Sol#,", "G#");
        const As = this.As = new Note("La#,", "A#");
        const Bs = this.Bs = new Note("Si#,", "B#");

        this.progression = [
            [C, Bs],
            [Cs, Df],
            [D],
            [Ds, Ef],
            [E, Ff],
            [F, Es],
            [Fs, Gf],
            [G],
            [Gs, Af],
            [A],
            [As, Bf],
            [B]
        ];
    }
}

module.exports = new NotesManager();
