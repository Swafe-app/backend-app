import checkAuth from '../../src/middleware/checkAuth';
import jwt from 'jsonwebtoken';
import { sendUnauthorized, sendForbidden } from '../../src/helpers/response';

const jwtMock = jwt as jest.Mocked<typeof jwt>;

jest.mock('jsonwebtoken');
jest.mock('../../src/helpers/response', () => ({
  sendUnauthorized: jest.fn(),
  sendForbidden: jest.fn(),
}));

describe('checkAuth middleware', () => {
  const nextFunction = jest.fn();
  const req = {
    headers: {
      authorization: 'Bearer testtoken123',
    },
  };
  let res: any;

  beforeEach(() => {
    jest.resetAllMocks();
    res = { locals: {} };
  });

  it('should call next() if token is valid', () => {
    jwtMock.verify.mockReturnValue({ uid: '123', email: 'test@example.com' } as any);

    checkAuth(req as any, res as any, nextFunction);

    expect(jwt.verify).toHaveBeenCalledWith('testtoken123', 'test');
    expect(res.locals.user).toEqual({ uid: '123', email: 'test@example.com' });
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should send unauthorized if no token provided', () => {
    const mockReq = { headers: {} };

    checkAuth(mockReq as any, res as any, nextFunction);

    expect(sendUnauthorized).toHaveBeenCalledWith(res, null, 'No token provided');
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should send forbidden if token is invalid or expired', () => {
    jwtMock.verify.mockImplementation(() => {
      throw new Error('Invalid or expired token');
    });

    checkAuth(req as any, res as any, nextFunction);

    expect(sendForbidden).toHaveBeenCalledWith(res, expect.any(Error), 'Invalid or expired token');
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
