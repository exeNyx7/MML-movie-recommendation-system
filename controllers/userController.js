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

        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role: 'user' // default role
        });

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
            { 
                user_id: user._id, 
                email, 
                role: user.role 
            },
                process.env.JWT_SECRET,
            { 
                expiresIn: "2h" 
            });

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

// Register Admin 
const registerAdmin = async (req, res) => {
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

        // Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create admin in our database
        const user = await User.create({
            username,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role: 'admin' // admin role
        });

        // return new admin
        res.status(201).json(user);
    } 
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if admin exist in our database
        const user = await User.findOne({ email, role: 'admin' });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
            { 
                user_id: user._id, 
                email, 
                role: user.role 
            },
                process.env.JWT_SECRET,
            { 
                expiresIn: "2h" 
            });

            // save user token
            user.token = token;

            // admin
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Update user profile (old)
// const updateUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const updates = {};
//         if (username) updates.username = username;
//         if (email) updates.email = email.toLowerCase();
//         if (password) updates.password = await bcrypt.hash(password, 10);

//         const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
//         res.status(200).json(user);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Something went wrong");
//     }
// };

//
const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email.toLowerCase();
        if (password) updates.password = await bcrypt.hash(password, 10);

        // Ensure that there are updates to apply
        if (Object.keys(updates).length === 0) {
            return res.status(400).send("No updates provided");
        }

        const user = await User.findByIdAndUpdate(req.user.user_id, updates, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

//

// Delete user
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId || req.body.userId || req.user.user_id;
        if (!userId) {
            return res.status(400).send("User ID is required");
        }

        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId || req.user.user_id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};


// Update user preferences (old)
// const updateUserPreferences = async (req, res) => {
//     try {
//         const { genres, actors } = req.body;
//         const user = await User.findByIdAndUpdate(req.user._id, {
//             'preferences.genres': genres,
//             'preferences.actors': actors
//         }, { new: true });
//         res.status(200).json(user);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send("Unable to update preferences");
//     }
// };

//
const updateUserPreferences = async (req, res) => {
    try {
        const { genres, actors } = req.body;
        const updates = {};
        if (genres) updates['preferences.genres'] = genres;
        if (actors) updates['preferences.actors'] = actors;

        // Ensure that there are updates to apply
        if (Object.keys(updates).length === 0) {
            return res.status(400).send("No updates provided");
        }

        const user = await User.findByIdAndUpdate(req.user.user_id, updates, { new: true });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Unable to update preferences");
    }
};
//

// Create or update a user's wishlist (old)
// const updateWishlist = async (req, res) => {
//     const { userId, movies } = req.body;
//     try {
//         let wishlist = await Wishlist.findOneAndUpdate(
//             { user: userId },
//             { $set: { movies: movies } },
//             { new: true, upsert: true }
//         );
//         res.status(201).json(wishlist);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

//
const updateWishlist = async (req, res) => {
    const { movies } = req.body;
    const userId = req.user.user_id;

    try {
        let wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $set: { movies: movies } },
            { new: true, upsert: true }
        ).populate('movies');
        res.status(201).json(wishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to update wishlist" });
    }
};
//

// Get a user's wishlist (old)
// const getWishlist = async (req, res) => {
//     const { userId } = req.params;
//     try {
//         const wishlist = await Wishlist.findOne({ user: userId }).populate('movies');
//         if (!wishlist) {
//             return res.status(404).json({ message: "Wishlist not found" });
//         }
//         res.status(200).json(wishlist);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

//
const getWishlist = async (req, res) => {
    const userId = req.params.userId || req.user.user_id;

    try {
        const wishlist = await Wishlist.findOne({ user: userId }).populate('movies');
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        res.status(200).json(wishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Unable to get wishlist" });
    }
};
//


module.exports = {
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserPreferences,
    updateWishlist,
    getWishlist
};
