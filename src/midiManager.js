const C3_MIDI_VALUE = 60;
const notesManager = require('./notesManager.js')
class MidiManager {
    constructor() {
        const that = this;
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({}).then(function onMidiSuccess(midiAccess) {
                console.log('success', midiAccess)
                for (let input of midiAccess.inputs) {
                    input[1].onmidimessage = ((message) => {
                        if (message.data[0] === 144 && message.data[2] !== 0) {
                            //console.log(message);
                            const note = that.getNoteFromMidiValue(message.data[1]);
                            if (that.currentNotePromise) {
                                console.log(note.note);
                                that.currentNotePromise(note.note);
                                that.currentNotePromise = null;
                            }
                        }
                    })
                }
            }, function onMidiError(e) {
                console.log('error', e);
            })
        }
    }

    getNoteFromMidiValue(value) {
        const offsetFromC3 = value - C3_MIDI_VALUE;
        const octaveNumber = Math.floor(offsetFromC3 / 12);
        const note = notesManager.progression[Math.abs(value) % 12];
        return {
            note,
            octave: 3 + octaveNumber
        }
    }

    getNextNote() {
        return new Promise((resolve, reject) => {
            this.currentNotePromise = resolve;
        })
    }

}

module.exports = new MidiManager();
