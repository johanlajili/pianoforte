const sleep = require('../utils/sleep');
const render = require('../render');
const midiManager = require('../midiManager');
async function playOneScale(scale, reversed) {
    const { notes, fingers } = scale;
    const normal = !reversed;
    let currentIndex = normal ? 0 : notes.length - 2;

    render.renderAnswers({
        notes,
        currentIndex,
        fingers,
        reversed
    });

    let notesArray = normal ? notes : ([]).concat(notes).reverse().slice(1);

    for (const note of notesArray) {
        let pressedNote = await midiManager.getNextNote();
        if (pressedNote.some(enharmonic => enharmonic.toString() === note.toString())) {
            currentIndex += normal ? 1 : -1;
            render.renderAnswers({ notes, currentIndex, fingers, reversed });
        } else {
            render.renderAnswers({ notes, currentIndex, fingers, reversed, wrongNote: pressedNote });
            await sleep(500);
            return {
                completion: 'wrongNote',
                wrongNote: pressedNote
            }
        }
    }
    return {
        completion: 'finished'
    }
}

async function playOneScaleBackAndForth(scale) {
    let result = null;
    do {
        result = await playOneScale(scale);
        if (result.completion === 'finished') {
            result = await playOneScale(scale, true);
        }
    } while (result.completion !== 'finished');
    sleep(500);
    return {
        completion: 'finished'
    }

}

module.exports = {
    playOneScale,
    playOneScaleBackAndForth
}
