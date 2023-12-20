import { Request, Response } from 'express';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { sendBadRequest, sendSuccess, sendUnauthorized } from '../helpers/response';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return sendBadRequest(res, null, "Email and password are required");

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    sendSuccess(res, { user: userCredential.user, token })
  } catch (e: any) {
    sendUnauthorized(res, e, "Authentication failed");
  }
}
