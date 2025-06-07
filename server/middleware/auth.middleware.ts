import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user;

  if (user && user.role === 'ADMIN') {
    return next(); // ok, passe au middleware suivant
  }

  res.status(403).json({ message: 'Access denied' });
};
