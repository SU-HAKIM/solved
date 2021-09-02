const jwt = require('jsonwebtoken');
const User = require('./user');

const verify = async (req, res, next) => {
    try {
        let verify = jwt.verify(req.cookies.jwt, process.env.SECRET_KEY)
        if (verify) {
            let user = await User.findOne({ _id: verify._id })
            req.user = user
            next()
        } else {
            res.redirect('/login')
        }
    } catch (error) {
        next(error)
    }
}


module.exports = { verify }

//?target is to send user to todo req