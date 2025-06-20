import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import * as controller from '../controllers/book.controller';

const router = Router();

router.get('/', authenticateToken, controller.getAllBooks);
router.get('/:id', authenticateToken, controller.getBookById);

router.post('/', authenticateToken, controller.createBook);

export default router;
