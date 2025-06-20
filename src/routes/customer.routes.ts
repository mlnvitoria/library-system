import { Router } from 'express';
import * as controller from '../controllers/customer.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticateToken, controller.getAllCustomers);
router.get('/:id', authenticateToken, controller.getCustomerById);

router.post('/', authenticateToken, controller.createCustomer);

export default router;
