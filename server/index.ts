import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.route';

import cors from 'cors';

import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: number;
      role: Role;
    }

    interface Request {
      user?: User;
    }
  }
}

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use((req, _res, next) => {
  req.user = { id: 1, role: 'ADMIN' };
  next();
});

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));

app.use('/api/products', productRoutes);
app.use('/api', categoryRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 