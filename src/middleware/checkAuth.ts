import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { sendForbidden, sendUnauthorized } from "../helpers/response";

const JWT_SECRET: string | null = process.env.NODE_ENV === 'test' ? 'test' : process.env.JWT_SECRET || null;

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return sendUnauthorized(res, null, 'No token provided');
  }

  try {
    if (!JWT_SECRET) return sendUnauthorized(res, null, 'No JWT_SECRET defined');
    const decodedToken = jwt.verify(token, JWT_SECRET);
    res.locals.user = decodedToken;        
    next();
  } catch (error: any) {
    return sendForbidden(res, error, "Invalid or expired token");
  }
};

export default checkAuth;
