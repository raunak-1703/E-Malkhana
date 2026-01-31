import express from 'express'
import { disposeProperty } from '../controllers/disposalController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', authMiddleware,disposeProperty);

export default router;