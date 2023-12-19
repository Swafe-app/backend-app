import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {  
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "Auth token is required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.locals.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default checkAuth;
