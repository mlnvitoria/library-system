import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import borrowingRoutes from './routes/borrowing.routes';
import customerRoutes from './routes/customer.routes';
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/customers', customerRoutes);
app.use('/borrowings', borrowingRoutes);
app.use('/users', userRoutes);

export default app;