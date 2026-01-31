import express from 'express'
import { addProperty } from '../controllers/propertyController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware,addProperty);

export default router;