const { model, Schema }  = require('mongoose') 
const bcrypt = require('bcrypt')

usersSchema = new Schema ({
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
    
})

usersSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password, salt)
    return hash
}

usersSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('Users', usersSchema)