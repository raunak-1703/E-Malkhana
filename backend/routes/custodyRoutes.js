import express from 'express'
import { addCustodyLog,getCustodyLogs } from '../controllers/custodyController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', authMiddleware,addCustodyLog);
router.get('/:propertyId',authMiddleware,getCustodyLogs);

export default router;