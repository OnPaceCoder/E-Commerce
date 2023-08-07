import express from 'express';

import { authUser, registerUser, logoutUser, getUserById, getUserProfile, getUsers, updateUser, updateUserProfile, deleteUser } from '../controllers/user.controller.js';


import { protect, admin } from '../middleware/auth.middleware.js';



const router = express.Router()

//Register and get all users routes
router
    .route('/')
    .post(registerUser)
    .get(protect, admin, getUsers)


//Auth and logout routes
router.post('/auth', authUser);
router.post('/logout', logoutUser);


//Get and update profile routes for user
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)


//Get, delete and  update profile routes for admin

router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser)


export default router;