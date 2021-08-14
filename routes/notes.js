const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')



router.
route('/')
.get( async (req, res) => {
    console.log('/Notes')
    const notes = await Note.find()

    res.render('notes/all-notes.hbs', {
        notes
    })
    
})
.post((req, res) => {
    console.log('Ingresando una nota')
    const newNote = new Note ({
        subject: req.body.subject,
        content: req.body.content
    })
    
    newNote.save()
    res.send('Nota agregada')
})

router.
route('/delete/:id')
.get((req, res) => {
    console.log(req.params.id)
    res.send(`Eliminando ${req.params.id}`)
    Note.findByIdAndDelete(req.params.id)
    //req.flash('notaEliminada', 'haz eliminado la nota')
    
})




module.exports = router;

