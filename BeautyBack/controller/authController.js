const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const signToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};

const sendTokenCookie = (token, res) => {
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.cookie("jwt", token, cookieOptions);
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
        });

        const token = signToken(newUser._id);

        sendTokenCookie(token, res);

        newUser.password = undefined;

        res.status(201).json({
            status: "success",
            token,
            data: {
                user: newUser,
            },
        });
    } catch (err) {
        next(err); 
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please provide email and password!" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ error: "Incorrect email or password" });
        }

        const token = signToken(user._id);
        user.password = undefined;
        console.log(user)

        res.status(200).json({
            status: "success",
            token,
            data: user,
        });
    } catch (err) {
        next(err);
    }
};

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token || token === "null") {
            return res.status(401).json({ error: "You are not logged in! Please login to get access." });
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const existingUser = await User.findById(decoded.id);
        if (!existingUser) {
            return res.status(401).json({ error: "The user belonging to this token does no longer exist." });
        }

        req.user = existingUser;
        next();
    } catch (err) {
        next(err);
    }
};


exports.restrictTo = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)&& !req.user.isAdmin) {
        return res.status(403).json({ error: "You do not have permission to perform this action" });
    }

    next();
};