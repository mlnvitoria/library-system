import { Router } from 'express';
import * as controller from '../controllers/borrowing.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, controller.getAllBorrowingsByCustomerId);
router.post('/', authenticateToken, controller.createBorrowing);
router.post('/return/:borrowingId', authenticateToken, controller.returnBook);

export default router;
