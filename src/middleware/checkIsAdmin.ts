import { NextFunction, Request, Response } from "express";
import { sendUnauthorized } from "../helpers/response";

const checkIsAdmin = async (_: Request, res: Response, next: NextFunction) => {
  const { role } = res.locals.user;

  if (role !== 'admin') {
    return sendUnauthorized(res, null, "Access denied. Admin only");
  }

  next();
};

export default checkIsAdmin;
