/*Responsible for storing all the scales, and having functions to transform them (double octave etc.)*/
const scales = require('./data/scales.js');

class ScalesManager {
    constructor() {
        this.transforms = {
            'None': {
                transformNotes: (array) => [].concat(array),
                transformLeftHandFingers: (array) => [].concat(array),
                transformRightHandFingers: (array) => [].concat(array),
            },
            'DoubleOctave': {
                transformNotes: (array) => array.concat(array.slice(1, 8)),
                transformLeftHandFingers: (array) => array.concat(array.slice(1, 8)),
                transformRightHandFingers: (array) => array.slice(0, 7).concat(array),
            },
            'OnlyBlacks': {
                transformNotes: (array) => array.filter(note => note.toString().match(/(#|♭)/)),
                transformLeftHandFingers: () => [],
                transformRightHandFingers: () => [],
            },
            'MinorNatural': {
                transformNotes: (array) => array.slice(5).concat(array.slice(0,5)),
                transformLeftHandFingers: () => [],
                transformRightHandFingers: () => [],
            }
        }
    }

    getScaleList() {
        return Object.keys(scales);
    }

    getRandomizedScaleList() {
        const result = [];
        const keys = this.getScaleList();
        for (let i = 0; i < keys.length; i++) {
            const randomIndex = Math.floor(Math.random() * (keys.length - 1))
            result.push(keys.splice(randomIndex, 1));
        }
        return result;
    }

    getScale(name, hand, transform = 'None') {
        const scale = scales[name];
        const result = {
            name: scale.name,
            notes: this.transforms[transform].transformNotes(scale.notes),
            leftHandFingers: this.transforms[transform].transformLeftHandFingers(scale.leftHandFingers),
            rightHandFingers: this.transforms[transform].transformRightHandFingers(scale.rightHandFingers)
        }
        if (hand) {
            result.fingers = result[`${hand}Fingers`];
        }
        return result;
    }
}

module.exports = new ScalesManager();
