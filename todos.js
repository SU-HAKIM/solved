const mongoose = require('mongoose');
const User = require('./user');

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

todoSchema.methods = {
    findAll: function () {
        return mongoose.model('Todo').findOne({ title: 'todo' })
    }
}

todoSchema.statics = {
    findJs: function () {
        return this.find({ title: 'js' })
    }
}

todoSchema.query = {
    skipThree: function () {
        return this.skip(3);
    }
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;