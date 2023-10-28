const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(401).json({ 'message': 'Username, Email and Password must be provided' });
    }

    const foundUser = await User.findOne({ username: username, email: email }).exec();
    if (foundUser) {
        return res.status(409).json({ 'message': 'User already exists' });
    }

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json("User created successfully");

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

module.exports = { signup };