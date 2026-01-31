import express from 'express'
import { createCase,getCaseById,searchCases } from '../controllers/caseController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

// protect all case routes
router.post('/', authMiddleware, createCase);
router.get('/:id',authMiddleware,getCaseById);
router.get('/',authMiddleware,searchCases);

export default router;