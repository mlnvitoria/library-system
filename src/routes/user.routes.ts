import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);

export default router;
