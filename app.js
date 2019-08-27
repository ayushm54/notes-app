// const validator = require('validator')
const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')

// console.log(notes());
// console.log(validator.isEmail('a@b.com'))
// console.log(validator.isURL('www.google.com'))
// console.log(chalk.red.bgGreen.bold('Success!'))
// console.log(chalk.red.bgWhite.bold.underline.inverse('Success!'))

// console.log(process.argv)
// console.log(yargs.argv)

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,    //makes the argument mandatory
            type: 'string'        //making the value of argumet title as string type
        },
        body: {
            describe: 'Note Body',
            demandOption: true,    //makes the argument mandatory
            type: 'string'        //making the value of argumet title as string type
        }
    },
    handler: (argv) => {
        notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'List out all notes',
    handler: () => {
        notes.listNotes()
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse()