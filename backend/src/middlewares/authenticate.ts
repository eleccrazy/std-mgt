import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Midleware to verify user token
export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = String(req.headers.authorization);
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, String(process.env.JWT_SECRET));
    next();
  } catch (error) {
    res.status(401).json({ Error: 'Unauthorized Access' });
  }
};

// Get id from the token
export const getUserIdFromToken = (token: string) => {
  const decodedToken: any = jwt.verify(token, String(process.env.JWT_SECRET));
  return decodedToken.id;
};
