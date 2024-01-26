import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendBadRequest, sendError, sendNotFound, sendSuccess } from '../helpers/response';
import User from '../models/users';
import createUserJwt from '../helpers/createUserJwt';

const JWT_SECRET = process.env.JWT_SECRET;

export const createAdmin = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return sendBadRequest(res, null, "Email, password, firstName, and lastName are required");
  }

  try {
    // Verify if user already exists
    const existingAdmin = await User.findOne({ where: { email } });
    if (existingAdmin) {
      return sendBadRequest(res, null, "Email already in use");
    }

    // Create a new user
    const newAdmin = await User.create({
      email,
      password,
      firstName,
      lastName,
      role: 'admin'
    });

    // Create token
    if (!JWT_SECRET) return sendError(res, null, 'No JWT_SECRET defined');
    const token = jwt.sign(createUserJwt(newAdmin), JWT_SECRET, { expiresIn: '1h' });

    sendSuccess(res, { admin: createUserJwt(newAdmin), token });
  } catch (e: any) {
    console.log(e);
    sendError(res, e, "Error creating admin");
  }
}

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { role: 'user' }, attributes: { exclude: ['password'] } });

    if (!users || users.length < 1) return sendNotFound(res, null, "Users not found");

    return sendSuccess(res, users);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error listing users");
  }
}

export const getAdmins = async (_: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { role: 'admin' }, attributes: { exclude: ['password'] } });

    if (!users || users.length < 1) return sendNotFound(res, null, "Users not found");

    return sendSuccess(res, users);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error listing users");
  }
}

export const updateUserSelfieStatus = async (req: Request, res: Response) => {
  const { selfieStatus, uid } = req.body;

  if (!selfieStatus || !uid) {
    return sendBadRequest(res, null, "selfieStatus and uid are required");
  }
  if (selfieStatus !== 'validated' && selfieStatus !== 'refused' && selfieStatus !== 'pending' && selfieStatus !== 'not_defined') {
    return sendBadRequest(res, null, "selfieStatus must be validated, refused, pending or not_defined");
  }

  try {
    const user = await User.findByPk(uid);

    if (!user) return sendNotFound(res, null, "User not found");

    await user.update({ selfieStatus });

    return sendSuccess(res, user);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error updating user");
  }
}
