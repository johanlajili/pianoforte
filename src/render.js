const settingsManager = require('./settingsManager');

class Render {
    constructor() {
        settingsManager.subscribe(() => {
            if (this.lastAnswer) { this.renderAnswers(this.lastAnswer) };
            if (this.lastQuestion) { this.renderQuestion(this.lastQuestion) };
        })
    }
    renderQuestion(question) {
        this.lastQuestion = question;
        document.querySelector('.question').textContent = question;
    }

    renderAnswers(args = {}) {
        this.lastAnswer = args;
        const { notes, currentIndex, fingers, reversed, wrongNote } = args;
        document.querySelector('.answer').innerHTML = '';
        notes.forEach((note, index) => {
            let showingDot = true;
            const isFirstNote = reversed ? (index === notes.length - 1) : (index === 0);
            const isValidNote = reversed ? (index > currentIndex) : (index < currentIndex);
            const isCurrentNote = (index === currentIndex);
            const isWrongNote = isCurrentNote && wrongNote;
            if (settingsManager.showAll || (settingsManager.showFirst && isFirstNote) || isValidNote) {
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
            if (fingers) {
                noteFinger.textContent = fingers[index];
                noteFinger.className = 'finger';
            }
            noteElement.appendChild(noteText);
            noteElement.appendChild(noteFinger);
            document.querySelector('.answer').appendChild(noteElement);
        });
    }
}

module.exports = new Render();
