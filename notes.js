const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.bold.inverse('Your Notes : '))
    notes.forEach(note => {
        console.log(chalk.blue(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find(note => note.title === title)
    if (note) {
        console.log(chalk.blue.bold.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.bgGreen.bold.inverse("Note not found!"))
    }
}

const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter(note => { //loops through notes array
    //     return note.title === title  //if true is returned the current note will be added to duplicate array
    // })
    const duplicateNode = notes.find(note => note.title === title)
    if (!duplicateNode) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.red.bgGreen.bold("New note added!"))
    } else {
        console.log(chalk.red.bgGreen.bold.inverse("Note title already taken!"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesAfterRemoving = notes.filter((note) => note.title !== title)
    if (notes.length > notesAfterRemoving.length) {
        saveNotes(notesAfterRemoving)
        console.log(chalk.red.bgGreen.bold("Note Removed!"))
    } else {
        console.log(chalk.red.bgGreen.bold.inverse("No note found with given title!"))
    }
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []   //returning empty array if file is not present
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}