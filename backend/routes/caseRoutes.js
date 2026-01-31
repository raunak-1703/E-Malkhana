import express from 'express'
import { createCase } from '../controllers/caseController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

// protect all case routes
router.post('/', authMiddleware, createCase);

export default router;