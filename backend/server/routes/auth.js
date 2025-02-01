import express from 'express'; 
import { register, login, refresh_token, protectedRoute, forgotPassword, resetPassword, userDetails, updateUserDetails } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/userDetails/:id', userDetails);
router.put('/updateUserDetails/:id', updateUserDetails);
router.post('/refresh-token', refresh_token);
router.get('/protected', authenticateToken, protectedRoute);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router; 
