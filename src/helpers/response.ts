import { Response } from 'express';

export const sendSuccess = (res: Response, data: any, message: string = 'Success request') => {
  res.status(200).json({ status: 'success', message, data });
};

export const sendBadRequest = (res: Response, error: Error | null = null, message: string = 'Bad Request') => {
  res.status(400).json({ status: 'error', message, errors: error ? error.stack?.split('\n') : [] });
};

export const sendUnauthorized = (res: Response, error: Error | null = null, message: string = 'Unauthorized') => {
  res.status(401).json({ status: 'error', message, errors: error ? error.stack?.split('\n') : [] });
};

export const sendNotFound = (res: Response, error: Error | null = null, message: string = 'Not Found') => {
  res.status(404).json({ status: 'error', message, errors: error ? error.stack?.split('\n') : [] });
};

export const sendError = (res: Response, error: Error | null = null, message: string = 'Internal Server Error') => {
  res.status(500).json({ status: 'error', message, errors: error ? error.stack?.split('\n') : [] });
};
