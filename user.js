const mongoose = require('mongoose');


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


const User = mongoose.model('User', userSchema);

module.exports = User;
