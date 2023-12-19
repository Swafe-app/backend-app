import { Request, Response } from 'express';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    res.status(200).json({ user: userCredential.user, token });
  } catch (error: any) {
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
}
