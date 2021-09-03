const mongoose = require('mongoose');
const Todo = require('./todos')

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
    ],
    todos: [
        { type: mongoose.Types.ObjectId, ref: Todo },
    ]
})


const User = mongoose.model('User', userSchema);

module.exports = User;
