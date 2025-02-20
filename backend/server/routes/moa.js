import express from 'express'; 
import { getMoa } from '../controllers/moaController.js';

const router = express.Router();

router.get('/getMoa', getMoa);


export default router; 