import express from 'express'; 
import { getMoa, getMoaById, addMoa, updateMoa, deleteMoa } from '../controllers/moaController.js';

const router = express.Router();

router.get('/getMoa', getMoa);
router.get('/getMoa/:id', getMoaById);
router.post('/addMoa', addMoa);
router.put('/updateMoa/:id', updateMoa);
router.delete('/deleteMoa/:id', deleteMoa);

export default router;





