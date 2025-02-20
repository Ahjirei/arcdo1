import express from 'express';
import { getPartner, getPartnerById, addPartner, updatePartner, deletePartner } from '../controllers/ipController.js';

const router = express.Router();

router.get('/getPartner', getPartner);
router.get('/getPartner/:id', getPartnerById);
router.post('/addPartner', addPartner);
router.put('/updatePartner/:id', updatePartner);
router.delete('/deletePartner/:id', deletePartner);

export default router;