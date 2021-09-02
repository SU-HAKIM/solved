require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./user');
const Todo = require("./todos");
const jwt = require('jsonwebtoken');
const { verify } = require('./middleware');
const cookieParser = require('cookie-parser');


mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true }).then(() => console.log('connected')).catch(err => console.log(err));



const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('last')
})

app.post('/register', async (req, res, next) => {
    let data = req.body;
    try {
        let user = new User(data);
        let token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
        user.tokens = [...user.tokens, { token: token }]
        let result = await user.save();
        res.send(result)
    } catch (error) {
        next(error)
    }
})


app.post('/login', async (req, res, next) => {
    let data = req.body;
    try {
        let user = await User.findOne({ email: data.email });
        if (user) {
            res.cookie('jwt', user.tokens[0].token)
        }
        res.redirect("/todo")
    } catch (error) {
        next(error)
    }
})

app.get('/login', (req, res, next) => {
    if (res.headersSent) {
        return next('header already sent')
    }
    res.send("<form action='/login' method='POST'><input type='email' name='email'/><input type='password' name='password'/><input type='submit' value='send'/></form>")
})


app.get('/todo', verify, (req, res, next) => {
    if (res.headersSent) {
        return next('header already sent')
    }
    res.send("<form action='/todo' method='POST'><input type='text' name='title'/><textarea name='description'></textarea><input type='submit' value='send'/></form>")
})


app.post('/todo/:id', async (req, res, next) => {
    try {
        let todo = await Todo.findOne({ _id: req.params.id }).populate('user')
        if (todo) {
            res.send(todo)
        } else {
            next('todo not found')
        }
    } catch (error) {
        next(error)
    }
})

app.post('/todo', verify, async (req, res, next) => {
    let data = req.body;
    try {
        data.user = req.user._id
        let todo = new Todo(data);
        let result = await todo.save()
        console.log(result)
        res.send(result);
    } catch (error) {
        next(error)
    }
})


app.get('/user', (req, res) => {
    res.send('user page')
})


app.listen(5000, () => {
    console.log('listening')
})

