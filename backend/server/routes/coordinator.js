import express from 'express'; 
import { getCoordinators, getCoordinatorById, addCoordinator, updateCoordinator, deleteCoordinator } from '../controllers/coordinatoController.js';

const router = express.Router();

router.get('/getCoordinators', getCoordinators);
router.get('/getCoordinators/:id', getCoordinatorById);
router.put('/updateCoordinator/:id', updateCoordinator);
router.post('/addCoordinator', addCoordinator);
router.delete('/deleteCoordinator/:id', deleteCoordinator);


export default router; 