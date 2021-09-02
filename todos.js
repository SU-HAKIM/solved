const mongoose = require('mongoose');
const User = require('./user');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: User
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;