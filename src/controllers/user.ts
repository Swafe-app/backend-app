import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendBadRequest, sendError, sendNotFound, sendSuccess, sendUnauthorized } from '../helpers/response';
import User from '../models/users';
import createUserJwt from '../helpers/createUserJwt';
import crypto from 'crypto';
import { deleteFile } from '../helpers/deleteFile';

const JWT_SECRET: string | null = process.env.NODE_ENV === 'test' ? 'test' : process.env.JWT_SECRET || null;

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
    if (process.env.NODE_ENV === 'development') console.log(e);
    sendUnauthorized(res, e, "Authentication failed");
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, phoneNumber, phoneCountryCode } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return sendBadRequest(res, null, "Email, password, firstName, and lastName are required");
  }

  try {
    // Verify if user email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendBadRequest(res, null, "Email already in use");
    }

    // Verify if user phoneNumber already exists
    if (phoneNumber !== undefined) {
      const existingPhoneNumber = await User.findOne({ where: { phoneNumber } });
      if (existingPhoneNumber) {
        return sendBadRequest(res, null, "Phone number already in use");
      }
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Create a new user
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      phoneCountryCode,
      verificationToken
    });

    // Create token
    if (!JWT_SECRET) return sendError(res, null, 'No JWT_SECRET defined');
    const token = jwt.sign(createUserJwt(newUser), JWT_SECRET, { expiresIn: '1h' });

    sendSuccess(res, { user: createUserJwt(newUser), token });
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') console.log(e);
    sendError(res, e, "Error creating user");
  }
}

export const getUser = async (_: Request, res: Response) => {
  const { uid } = res.locals.user;

  try {
    const users = await User.findByPk(uid, { attributes: { exclude: ['password', 'verificationToken'] } });

    if (!users) return sendNotFound(res, null, "User not found");

    // Create token
    if (!JWT_SECRET) return sendError(res, null, 'No JWT_SECRET defined');
    const token = jwt.sign(createUserJwt(users), JWT_SECRET, { expiresIn: '1h' });

    return sendSuccess(res, { user: createUserJwt(users), token });
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') console.log(e);
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

    // Verify if email or phoneNumber already exists
    if (email !== undefined) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail && existingEmail.uid !== uid) {
        return sendBadRequest(res, null, "Email already in use");
      }
    }
    if (phoneNumber !== undefined) {
      const existingPhoneNumber = await User.findOne({ where: { phoneNumber } });
      if (existingPhoneNumber && existingPhoneNumber.uid !== uid) {
        return sendBadRequest(res, null, "Phone number already in use");
      }
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
    if (process.env.NODE_ENV === 'development') console.log(e);
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
    if (process.env.NODE_ENV === 'development') console.log(e);
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
    if (process.env.NODE_ENV === 'development') console.log(e);
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
    if (process.env.NODE_ENV === 'development') console.log(e);
    sendError(res, e, "Error verifying email");
  }
}

export const uploadSelfie = async (req: Request, res: Response) => {
  const { uid } = res.locals.user;
  const { file } = req;

  if (!file) {
    return sendBadRequest(res, null, "No file uploaded");
  }
  if (!uid) return sendBadRequest(res, null, "Invalid uid");

  try {
    // Accept valide format image
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg', 'image/heic', 'image/heif'];
    const { filename, path, size, mimetype } = file;

    if (!allowedMimes.includes(mimetype)) {
      await deleteFile(path);
      return sendBadRequest(res, null, "Invalid file format (only jpeg, jpg, png, heic, heif)");
    }
    if (!filename || !path || !size) {
      await deleteFile(path);
      return sendBadRequest(res, null, "Invalid file");
    }
    if (size > 10000000) {
      await deleteFile(path);
      return sendBadRequest(res, null, "File size must be less than 10MB");
    }

    const user = await User.findByPk(uid);
    if (!user) {
      await deleteFile(path);
      return sendNotFound(res, null, "User not found");
    }
    if (user.selfieStatus !== 'not_defined' && user.selfieStatus !== 'refused') {
      await deleteFile(path);
      let message;
      switch (user.selfieStatus) {
        case 'pending':
          message = "Selfie already uploaded, waiting for verification";
          break;
        case 'verified':
          message = "Selfie already verified";
          break;
        default:
          message = "Selfie already uploaded";
          break;
      }
      return sendBadRequest(res, null, message);
    }

    await user.update({
      selfie: file.filename,
      selfieStatus: 'pending'
    });

    sendSuccess(res, { fileName: user.selfie }, "Selfie uploaded successfully");
  } catch (e: any) {
    if (process.env.NODE_ENV === 'development') console.log(e);
    if (req.file) {
      const { path } = req.file;
      await deleteFile(path);
    }
    sendError(res, e, "Error uploading selfie");
  }
}
