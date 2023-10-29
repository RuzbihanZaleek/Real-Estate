const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const errorHandler = require("../utils/errorHandler.utils.js");
const jwtToken = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return next(errorHandler(401, 'Username, Email and Password must be provided'));
    }

    try {
        const foundUser = await User.findOne({ username, email }).exec();
        if (foundUser) {
            return next(errorHandler(409, 'User already exists'));
        }
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User created successfully");

    } catch (err) {
        next(err);
    }
}


const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!password || !email) {
            return next(errorHandler(401, 'Email and Password must be provided'));
        }

        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser) return next(errorHandler(404, 'User not found'));

        const validatePassword = bcryptjs.compareSync(password, foundUser.password);
        if (!validatePassword) return next(errorHandler(401, 'Password is incorrect'));

        const token = jwtToken.sign({ id: foundUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = foundUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);

    } catch (err) {
        next(err);
    }


}
module.exports = { signup, signIn };