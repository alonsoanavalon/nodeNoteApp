const { model, Schema } = require('mongoose')

notesSchema = new Schema({
    subject: {
        type: String
    },

    content: String
})

module.exports = model('Notes', notesSchema)