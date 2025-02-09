import express from 'express';
import { getAdminUsers, setAdminRole  } from '../controllers/adminController.js';

const router = express.Router();

// Route for getting users
router.get('/', getAdminUsers);
router.post('/setAdmin', setAdminRole);


export default router;
