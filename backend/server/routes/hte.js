import express from 'express'; 
import { getHte, getHteById, addHte, updateHte, deleteHte } from '../controllers/hteController.js';

const router = express.Router();

router.get('/getHte', getHte);
router.get('/getHte/:id', getHteById);
router.put('/updateHte/:id', updateHte);
router.post('/addHte', addHte);
router.delete('/deleteHte/:id', deleteHte);


export default router; 