import express from 'express'; 
import { getCoordinators, getCoordinatorById, addCoordinator, updateCoordinator, deleteCoordinator } from '../controllers/coordinatorController.js';

const router = express.Router();

// Change this line to match what Navbar is calling
router.get('/getCoordinator', getCoordinators);
router.get('/getCoordinators/:id', getCoordinatorById);
router.put('/updateCoordinator/:id', updateCoordinator);
router.post('/addCoordinator', addCoordinator);
router.delete('/deleteCoordinator/:id', deleteCoordinator);

export default router;