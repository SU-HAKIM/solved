const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: String,
    password: String,
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
})

// userSchema.methods.generateToken = async () => {
//     try {
//         console.log(this._id)
//         this.tokens = this.tokens.concat({ token: token })
//         await this.save()
//         return token
//     } catch (error) {
//         console.log(error)
//     }
// }


const User = mongoose.model('User', userSchema);

module.exports = User;
