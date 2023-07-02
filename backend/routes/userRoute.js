import express from 'express';
const router = express.Router();
import { LogoutUser, RegisterUser, authUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authmiddleware.js';

router.post('/', RegisterUser);
router.post('/auth', authUser);
router.post('/logout', LogoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
