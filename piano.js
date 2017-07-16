let currentNotePromise = null;

const C = "C";
const D = "D";
const E = "E";
const F = "F";
const G = "G";
const A = "A";
const B = "B";
const Cf = "C♭";
const Df = "D♭";
const Ef = "E♭";
const Ff = "F♭";
const Gf = "G♭";
const Af = "A♭";
const Bf = "B♭";
const Cs = "C#";
const Ds = "D#";
const Es = "E#";
const Fs = "F#";
const Gs = "G#";
const As = "A#";
const Bs = "B#";

const progression = [
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

const C3MidiValue = 60;

const scaleModifiers = {
    doubleOctave: {
        name: "Double Octave",
        notes: (notes) => {
            return notes.concat(notes.slice(1, 8));
        },
        fingersLeftHand: (array) => {
            return array.concat(array.slice(1, 8));
        },
        fingersRightHand: (array) => {
            return array.slice(0, 7).concat(array);
        }
    },
    onlyBlacks: {
        name: "Only blacks",
        notes: (notes) => {
            return notes.filter(note => note.match(/(#|♭)/));
        },
        fingersLeftHand: (array) => {
            return [];
        },
        fingersRightHand: (array) => {
            return [];
        }
    }
}


const scales = [

    //C
    {
        name: `Major Scale of ${C}`,
        notes: [C, D, E, F, G, A, B, C],
        fingersRightHand: [1, 2, 3, 1, 2, 3, 4, 5],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
    //G
    {
        name: `Major Scale of ${G}`,
        notes: [G, A, B, C, D, E, Fs, G],
        fingersRightHand: [1, 2, 3, 1, 2, 3, 4, 5],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
    //D
    {
        name: `Major Scale of ${D}`,
        notes: [D, E, Fs, G, A, B, Cs, D],
        fingersRightHand: [1, 2, 3, 1, 2, 3, 4, 5],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
    //A
    {
        name: `Major Scale of ${A}`,
        notes: [A, B, Cs, D, E, Fs, Gs, A],
        fingersRightHand: [1, 2, 3, 1, 2, 3, 4, 5],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
    //E
    {
        name: `Major Scale of ${E}`,
        notes: [E, Fs, Gs, A, B, Cs, Ds, E],
        fingersRightHand: [1, 2, 3, 1, 2, 3, 4, 5],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
    //B
    {
        name: `Major Scale of ${B}`,
        notes: [B, Cs, Ds, E, Fs, Gs, As, B],
        fingersRightHand: [1, 2, 3, 1, 2, 3, 4, 5],
        fingersLeftHand: [4, 3, 2, 1, 4, 3, 2, 1],
    },
    //Fs
    {
        name: `Major Scale of ${Fs}`,
        notes: [Fs, Gs, As, B, Cs, Ds, F, Fs],
        fingersRightHand: [2, 3, 4, 1, 2, 3, 1, 2],
        fingersLeftHand: [4, 3, 2, 1, 3, 2, 1, 4],
    },
    //F
    {
        name: `Major Scale of ${F}`,
        notes: [F, G, A, Bf, C, D, E, F],
        fingersRightHand: [1, 2, 3, 4, 1, 2, 3, 4],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
    //Bf
    {
        name: `Major Scale of ${Bf}`,
        notes: [Bf, C, D, Ef, F, G, A, Bf],
        fingersRightHand: [1, 2, 3, 4, 1, 2, 3, 4],
        fingersLeftHand: [5, 4, 3, 2, 1, 3, 2, 1],
    },
];

function renderQuestion(question, notes, fingers, options = {}) {
    document.querySelector('.question').textContent = question;
}

function renderAnswers(args = {}) {
    const { notes, currentIndex, fingers, wrongNote, options } = args;
    document.querySelector('.answer').innerHTML = '';
    notes.forEach((note, index) => {
        let showingDot = true;
        const isFirstNote = options.reverse ? (index === notes.length - 1) : (index === 0);
        const isValidNote = options.reverse ? (index > currentIndex) : (index < currentIndex);
        const isCurrentNote = (index === currentIndex);
        const isWrongNote = isCurrentNote && wrongNote;
        if (options.showAll || (options.showFirst && isFirstNote) || isValidNote) {
            showingDot = false;
        }
        const noteElement = document.createElement('div');
        const noteText = document.createElement('span');
        const noteFinger = document.createElement('span');

        noteElement.className = `note ${isCurrentNote ? 'current' : ''} ${isValidNote ? 'valid' : ''} ${isWrongNote ? 'wrong' : ''}`;

        if (isWrongNote) {
            noteText.textContent = wrongNote[0];
        } else if (showingDot) {
            noteText.textContent = '●';
        } else {
            noteText.textContent = note;
        }

        noteFinger.textContent = fingers[index];
        noteFinger.className = 'finger';
        noteElement.appendChild(noteText);
        noteElement.appendChild(noteFinger);
        document.querySelector('.answer').appendChild(noteElement);
    });
}


async function displayQuestion(question, notes, fingers, options = {}) {
    let currentIndex = 0;
    if (options.reverse) {
        currentIndex = notes.length - 2;
    }
    const pressedNotes = []
    renderQuestion(question);
    renderAnswers({
        notes,
        currentIndex,
        fingers,
        options
    });

    let notesArray = [].concat(notes);
    if (options.reverse) {
        notesArray.reverse();
        notesArray = notesArray.slice(1);
    }
    for (const note of notesArray) {
        let pressedNote = await getNextNote();
        if (pressedNote.some(enharmonic => enharmonic === note)) {
            if (options.reverse) {
                currentIndex--;
            } else {
                currentIndex++;
            }
            renderAnswers({ notes, currentIndex, fingers, options });
        } else {
            renderAnswers({
                notes,
                currentIndex,
                fingers,
                options,
                wrongNote: pressedNote
            });
            await timeout(500);
            options.reverse = false;
            await displayQuestion(question, notes, fingers, options);
            return;
        }
    }
    if (options.reverse) {
        console.log('next question')
    } else {
        options.reverse = true;
        await displayQuestion(question, notes, fingers, options)
    }
}

async function getNextNote() {
    return new Promise((resolve, reject) => {
        currentNotePromise = resolve;
    })
}

async function displayQuestions() {
    for (scale of scales) {
        await displayQuestion(`Play the ${scale.name} Right Hand`, scaleModifiers.doubleOctave.notes(scale.notes), scaleModifiers.doubleOctave.fingersRightHand(scale.fingersRightHand), { showFirst: true });
        await displayQuestion(`Play the ${scale.name} Left Hand`, scaleModifiers.doubleOctave.notes(scale.notes), scaleModifiers.doubleOctave.fingersLeftHand(scale.fingersLeftHand), { showFirst: true });
    }
}

window.onload = function() {
    displayQuestions();
}


function getNoteFromMidiValue(value) {
    const offsetFromC3 = value - C3MidiValue;
    const octaveNumber = Math.floor(offsetFromC3 / 12);
    const note = progression[Math.abs(value) % 12];
    return {
        note,
        octave: 3 + octaveNumber
    }
}



if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({}).then(function onMidiSuccess(midiAccess) {
        console.log('success', midiAccess)
        for (let input of midiAccess.inputs) {
            input[1].onmidimessage = ((message) => {
                if (message.data[0] === 144 && message.data[2] !== 0) {
                    //console.log(message);
                    const note = getNoteFromMidiValue(message.data[1]);
                    if (currentNotePromise) {
                        console.log(note.note);
                        currentNotePromise(note.note);
                        currentNotePromise = null;
                    }
                }
            })
        }
    }, function onMidiError(e) {
        console.log('error', e);
    })
}
document.body.onclick = () => {
    document.body.parentElement.webkitRequestFullscreen();
    document.body.onclick = null;
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
