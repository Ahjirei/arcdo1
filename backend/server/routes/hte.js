import express from 'express'; 
import { getHte } from '../controllers/hteController.js';

const router = express.Router();

router.get('/getHte', getHte);


export default router; 