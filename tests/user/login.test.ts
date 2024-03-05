import { loginUser } from '../../src/controllers/user';
import createUserJwt from '../../src/helpers/createUserJwt';
import { sendBadRequest, sendSuccess, sendUnauthorized } from '../../src/helpers/response';
import User from '../../src/models/users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const bcryptMock = bcrypt as jest.Mocked<typeof bcrypt>;
const jwtMock = jwt as jest.Mocked<typeof jwt>;
const UserMock = User as jest.Mocked<typeof User>;
const createUserJwtMock = createUserJwt as jest.MockedFunction<typeof createUserJwt>;

jest.mock('../../src/models/users');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../src/helpers/response', () => ({
  sendBadRequest: jest.fn(),
  sendUnauthorized: jest.fn(),
  sendSuccess: jest.fn(),
  sendError: jest.fn(),
}));
jest.mock('../../src/helpers/createUserJwt');

describe('loginUser', () => {
  const mockReq = {
    body: {
      email: 'test@example.com',
      password: 'password123',
    },
  };

  const mockRes = "res" as any;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return bad request if email or password is missing', async () => {
    await loginUser({ body: {} } as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email and password are required");
  });

  it('should return unauthorized if user does not exist', async () => {
    UserMock.findOne.mockResolvedValue(null);

    await loginUser(mockReq as any, mockRes);
    expect(sendUnauthorized).toHaveBeenCalledWith(mockRes, null, "Authentication failed");
  });

  it('should return unauthorized if password is invalid', async () => {
    UserMock.findOne.mockResolvedValue({ email: 'test@example.com', password: 'wrongPassword' } as any);
    bcryptMock.compareSync.mockReturnValue(false);

    await loginUser(mockReq as any, mockRes);
    expect(sendUnauthorized).toHaveBeenCalledWith(mockRes, null, "Authentication failed");
  });

  it('should return success with user and token if authentication is successful', async () => {
    const mockUser = { id: 1, email: 'test@example.com', password: 'correctPassword' };
    UserMock.findOne.mockResolvedValue(mockUser as any);
    bcryptMock.compareSync.mockReturnValue(true);
    jwtMock.sign.mockReturnValue('tokenMock' as any);
    createUserJwtMock.mockReturnValue(mockUser as any);

    await loginUser(mockReq as any, mockRes);
    expect(jwt.sign).toHaveBeenCalled();
    expect(createUserJwt).toHaveBeenCalledWith(mockUser);
    expect(sendSuccess).toHaveBeenCalledWith(mockRes, { user: mockUser, token: 'tokenMock'});
  });

  it('should handle errors and return unauthorized if something goes wrong', async () => {
    UserMock.findOne.mockImplementation(() => {
      throw new Error('Database error');
    });

    await loginUser(mockReq as any, mockRes);
    expect(sendUnauthorized).toHaveBeenCalledWith(mockRes, expect.anything(), "Authentication failed");
  });
});
