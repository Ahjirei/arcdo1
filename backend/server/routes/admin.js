import express from 'express';
import { getAdminUsers, setAdminRole, removeAdminRole  } from '../controllers/adminController.js';

const router = express.Router();

// Route for getting users
router.get('/', getAdminUsers);
router.post('/setAdmin', setAdminRole);
router.post('/removeAdminRole', removeAdminRole);

export default router;
