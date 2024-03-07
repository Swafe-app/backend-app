import { Response } from 'express';
import {
  sendSuccess,
  sendBadRequest,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendError,
} from '../../src/helpers/response';

const mockRes = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Response helper', () => {
  let res: Response;

  beforeEach(() => {
    jest.resetAllMocks();
    res = mockRes();
  });

  describe('sendSuccess', () => {
    it('should send a 200 status with success message', () => {
      const data = { key: 'value' };
      const message = 'Success message';

      sendSuccess(res, data, message);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ status: 'success', message, data });
    });
  });

  describe('sendBadRequest', () => {
    it('should send a 400 status with error message', () => {
      const error = new Error('Test error');
      const message = 'Bad request message';

      sendBadRequest(res, error, message);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message,
        errors: error.stack?.split('\n') || [],
      });
    });
  });

  describe('sendUnauthorized', () => {
    it('should send a 401 status with unauthorized message', () => {
      const error = new Error('Unauthorized');
      sendUnauthorized(res, error, 'Unauthorized');

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Unauthorized',
        errors: error.stack?.split('\n') || [],
      });
    });
  });

  describe('sendForbidden', () => {
    it('should send a 403 status with forbidden message', () => {
      const error = new Error('Forbidden');

      sendForbidden(res, error, 'Forbidden');
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Forbidden',
        errors: error.stack?.split('\n') || [],
      });
    });
  });

  describe('sendNotFound', () => {
    it('should send a 404 status with not found message', () => {
      const error = new Error('Not found');

      sendNotFound(res, error, 'Not Found');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Not Found',
        errors: error.stack?.split('\n') || [],
      });
    });
  });

  describe('sendError', () => {
    it('should send a 500 status with internal server error message', () => {
      const error = new Error('Internal server error');

      sendError(res, error, 'Internal Server Error');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Internal Server Error',
        errors: error.stack?.split('\n') || [],
      });
    });
  });
});
