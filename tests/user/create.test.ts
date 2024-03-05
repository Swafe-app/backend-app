import { createUser } from '../../src/controllers/user';
import createUserJwt from '../../src/helpers/createUserJwt';
import { sendBadRequest, sendSuccess, sendError } from '../../src/helpers/response';
import User from '../../src/models/users';
import jwt from 'jsonwebtoken';

const jwtMock = jwt as jest.Mocked<typeof jwt>;
const UserMock = User as jest.Mocked<typeof User>;
const createUserJwtMock = createUserJwt as jest.MockedFunction<typeof createUserJwt>;

jest.mock('../../src/models/users');
jest.mock('jsonwebtoken');
jest.mock('../../src/helpers/response', () => ({
  sendBadRequest: jest.fn(),
  sendSuccess: jest.fn(),
  sendError: jest.fn(),
}));
jest.mock('../../src/helpers/createUserJwt');

describe('createUser', () => {
  const mockReq = {
    body: {
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      phoneCountryCode: '+1'
    },
  };

  const mockRes = "res" as any;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_secret';
  });

  it('should return bad request if email fields are missing', async () => {
    const req = { body: { password: "password123", firstName: "John", lastName: "Doe" } };

    await createUser(req as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email, password, firstName, and lastName are required");
  });

  it('should return bad request if password fields are missing', async () => {
    const req = { body: { email: "newuser@example.com", firstName: "John", lastName: "Doe" } };

    await createUser(req as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email, password, firstName, and lastName are required");
  });

  it('should return bad request if firstName fields are missing', async () => {
    const req = { body: { email: "newuser@example.com", password: "password123", lastName: "Doe" } };

    await createUser(req as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email, password, firstName, and lastName are required");
  });

  it('should return bad request if lastName fields are missing', async () => {
    const req = { body: { email: "newuser@example.com", password: "password123", firstName: "John" } };

    await createUser(req as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email, password, firstName, and lastName are required");
  });

  it('should return bad request if email is already in use', async () => {
    UserMock.findOne.mockResolvedValueOnce(true as any);

    await createUser(mockReq as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email already in use");
  });

  it('should return bad request if phone number is already in use', async () => {
    UserMock.findOne
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(true as any);

    await createUser(mockReq as any, mockRes);
    expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Phone number already in use");
  });

  it('should return success with user and token if user is successfully created', async () => {
    UserMock.findOne.mockResolvedValueOnce(null);
    UserMock.create.mockResolvedValue(mockReq.body);
    jwtMock.sign.mockReturnValue('tokenMock' as any);
    createUserJwtMock.mockReturnValue(mockReq.body as any);

    await createUser(mockReq as any, mockRes);
    expect(User.create).toHaveBeenCalledWith({
      ...mockReq.body,
      verificationToken: expect.any(String),
    });
    expect(jwt.sign).toHaveBeenCalled();
    expect(createUserJwt).toHaveBeenCalledWith(mockReq.body);
    expect(sendSuccess).toHaveBeenCalledWith(mockRes, { user: mockReq.body, token: 'tokenMock' });
  });

  it('should return error when there is a problem creating the user', async () => {
    UserMock.findOne.mockResolvedValueOnce(null);
    UserMock.create.mockImplementation(() => {
      throw new Error('Database error');
    });

    await createUser(mockReq as any, mockRes);
    expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error creating user");
  });
});
