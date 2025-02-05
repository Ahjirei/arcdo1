import express from 'express'; 
import { getPartner } from '../controllers/ipController.js';

const router = express.Router();

router.get('/getPartner', getPartner);


export default router; 