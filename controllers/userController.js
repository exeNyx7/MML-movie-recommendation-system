const User = require('../models/User');
const Wishlist = require('../models/Wishlist');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate user input
        if (!(email && password && username)) {
            return res.status(400).send("All input is required");
        }

        // Check if user already exists
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exists. Please Login");
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // // Create token
        // const token = jwt.sign(
        //     { user_id: user._id, email },
        //     process.env.JWT_SECRET,
        //     {
        //         expiresIn: "2h", // expires in 2 hours
        //     }
        // );

        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } 
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Update user profile
const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email.toLowerCase();
        if (password) updates.password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        res.status(200).send("User deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};


// Update user preferences
const updateUserPreferences = async (req, res) => {
    try {
        const { genres, actors } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {
            'preferences.genres': genres,
            'preferences.actors': actors
        }, { new: true });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to update preferences");
    }
};

// Create or update wishlist
const updateWishlist = async (req, res) => {
    try {
        const { movies } = req.body; // Array of movie IDs
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user._id, movies });
        } else {
            wishlist.movies = movies;
        }
        await wishlist.save();
        res.status(200).json(wishlist);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to update wishlist");
    }
};

// Get wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('movies');
        res.status(200).json(wishlist);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to retrieve wishlist");
    }
};


module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserPreferences,
    updateWishlist,
    getWishlist
};
