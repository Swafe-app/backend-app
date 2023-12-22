import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendBadRequest, sendError, sendNotFound, sendSuccess, sendUnauthorized } from '../helpers/response';
import User from '../models/users';
import createUserJwt from '../helpers/createUserJwt';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return sendBadRequest(res, null, "Email and password are required");

  try {
    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return sendUnauthorized(res, null, "Authentication failed");
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return sendUnauthorized(res, null, "Authentication failed");
    }

    // Create token
    if (!JWT_SECRET) return sendError(res, null, 'No JWT_SECRET defined');
    const token = jwt.sign(createUserJwt(user), JWT_SECRET, { expiresIn: '1h' });

    sendSuccess(res, { user: createUserJwt(user), token })
  } catch (e: any) {
    console.log(e);
    sendUnauthorized(res, e, "Authentication failed");
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return sendBadRequest(res, null, "Email, password, firstName, and lastName are required");
  }

  try {
    // Verify if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendBadRequest(res, null, "Email already in use");
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Create a new user
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      verificationToken
    });

    // Create token
    if (!JWT_SECRET) return sendError(res, null, 'No JWT_SECRET defined');
    const token = jwt.sign(createUserJwt(newUser), JWT_SECRET, { expiresIn: '1h' });

    sendSuccess(res, { user: createUserJwt(newUser), token });
  } catch (e: any) {
    console.log(e);
    sendError(res, e, "Error creating user");
  }
}

export const getUser = async (_: Request, res: Response) => {
  const { uid } = res.locals.user;

  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const users = await User.findByPk(uid, { attributes: { exclude: ['password', 'verificationToken'] } });

    if (!users) return sendNotFound(res, null, "User not found");

    return sendSuccess(res, users);
  } catch (e: any) {
    console.log(e);
    return sendError(res, e, "Error getting user");
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { uid } = res.locals.user;
  const { email, firstName, lastName, phoneCountryCode, phoneNumber } = req.body;

  if (!email && !firstName && !lastName && !phoneCountryCode && !phoneNumber) {
    return sendBadRequest(res, null, "Nothing to update");
  }
  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const user = await User.findByPk(uid);
    if (!user) {
      return sendNotFound(res, null, "User not found");
    }

    await user.update({
      email: email || user.email,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      phoneCountryCode: phoneCountryCode || user.phoneCountryCode,
      phoneNumber: phoneNumber || user.phoneNumber
    });

    sendSuccess(res, { user: createUserJwt(user) }, "User updated successfully");
  } catch (e: any) {
    console.log(e);
    sendError(res, e, "Error updating user");
  }
}

export const updateUserPassword = async (req: Request, res: Response) => {
  const { uid } = res.locals.user;
  const { password, newPassword } = req.body;

  if (!password || !newPassword) {
    return sendBadRequest(res, null, "Password and newPassword are required");
  }
  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const user = await User.findByPk(uid);
    if (!user) {
      return sendNotFound(res, null, "User not found");
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return sendUnauthorized(res, null, "Authentication failed");
    }

    await user.update({
      password: newPassword
    });

    sendSuccess(res, { user: createUserJwt(user) }, "Password updated successfully");
  } catch (e: any) {
    console.log(e);
    sendError(res, e, "Error updating user password");
  }
}

export const deleteUser = async (_: Request, res: Response) => {
  const { uid } = res.locals.user;

  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    const user = await User.findByPk(uid);
    if (!user) {
      return sendNotFound(res, null, "User not found");
    }

    await user.destroy();

    sendSuccess(res, null, "User deleted successfully");
  } catch (e: any) {
    console.log(e);
    sendError(res, e, "Error deleting user");
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;

  if (!token) {
    return sendBadRequest(res, null, "Invalid token");
  }

  try {
    const user = await User.findOne({ where: { verificationToken: token } });
    if (!user) {
      return sendNotFound(res, null, "User not found");
    }

    await user.update({
      emailVerified: true,
      verificationToken: null
    });

    sendSuccess(res, null, "Email verified successfully");
  } catch (e: any) {
    console.log(e);
    sendError(res, e, "Error verifying email");
  }
}
