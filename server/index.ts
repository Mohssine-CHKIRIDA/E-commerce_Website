import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.route';
import reviewRoutes from './routes/review.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { Role } from '@prisma/client';
import cartRoutes from './routes/cart.routes';
import { authMiddleware } from './middleware/authMiddleware';
import authRoutes from './routes/auth.routes';


declare global {
  namespace Express {
    interface User {
      id: number;
      role: Role;
    }

    export interface Request {
    user?: {
      id: number;
      email: string;
      role: string;
    };
  }

  }
}

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', authMiddleware, cartRoutes);





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

