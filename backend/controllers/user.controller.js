import generateToken from "../utils/generateToken.js";
import User from '../models/user.model.js'



//@desc  Auth user & get token
//@route POST /api/users/auth
//@access public

const authUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(401);
        next(new Error("Invalid email or password"))

    }

}



//@desc   Register a new user
//@router POST /api/users
//@access Public

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        return res.status(400).json({ error: 'User already exists' });

    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {

        return res.status(400).json({ error: 'Invalid user data' });

    }


}

//@desc   Logout user / clear cookie
//@route  POST /api/users/logout
//@access Public


const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    })
    res.status(200).json({ message: 'Logged out successfully' })
}



//@desc   Get user profile
//@route  GET /api/users/profile
//access  Private

const getUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
    else {
        res.status(404);
        next(new Error("User not found"))

    }
}

//@desc   Update user profile 
//@route  PUT /api/users/profile
//@access Private


const updateUserProfile = async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }
    else {
        res.status(404);
        next(new Error("User not found"))

    }

}


//@desc   Get all users
//@route  GET /api/users
//@access Private/Admin

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}

//@desc  Delete User
//@route DELETE  /api/users/:id
//access Private/Admin

const deleteUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');

        }
        await User.deleteOne({ _id: user._id })
        res.status(200).json({ message: 'User removed' });
    }
    else {
        res.status(404);
        const error = new Error("User not found");
        next(error);

    }
}


//@desc   Get User by Id
//route   Get /api/users/:id
//@access Private/Admin

const getUserById = async (req, res, next) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404);
        const error = new Error("User not found")

        next(error)
    }
}

//@desc   Update user
//@route  PUT /api/users/:id
//@access Private / Admin

const updateUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }
    else {
        res.status(404);
        next(new Error("User not found"))

    }
}


export { authUser, registerUser, logoutUser, getUserProfile, getUsers, getUserById, deleteUser, updateUser, updateUserProfile }