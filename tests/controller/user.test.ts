import { loginUser, createUser, getUser, updateUser, updateUserPassword, deleteUser } from '../../src/controllers/user';
import createUserJwt from '../../src/helpers/createUserJwt';
import { sendBadRequest, sendSuccess, sendError, sendUnauthorized, sendNotFound } from '../../src/helpers/response';
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
  sendNotFound: jest.fn(),
}));
jest.mock('../../src/helpers/createUserJwt');

describe('User controller', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('loginUser', () => {
    const mockReq = {
      body: {
        email: 'newuser@example.com',
        password: 'password123'
      },
    };

    const mockRes = "res" as any;

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
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, { user: mockUser, token: 'tokenMock' });
    });

    it('should handle errors and return unauthorized if something goes wrong', async () => {
      UserMock.findOne.mockImplementation(() => {
        throw new Error('Database error');
      });

      await loginUser(mockReq as any, mockRes);
      expect(sendUnauthorized).toHaveBeenCalledWith(mockRes, expect.anything(), "Authentication failed");
    });
  });

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
  })

  describe('getUser', () => {
    const mockReq = "req" as any;

    const mockRes = {
      locals: {
        user: {
          uid: 'user123',
        },
      },
    } as any;

    it('should return not found if user does not exist', async () => {
      UserMock.findByPk.mockResolvedValue(null);

      await getUser(mockReq, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "User not found");
    });

    it('should return success with user and token if user exists', async () => {
      const mockUser = {
        uid: 'user123',
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };
      UserMock.findByPk.mockResolvedValue(mockUser as any);
      jwtMock.sign.mockReturnValue('tokenMock' as any);
      createUserJwtMock.mockReturnValue(mockUser as any);

      await getUser(mockReq, mockRes);
      expect(User.findByPk).toHaveBeenCalledWith('user123', expect.objectContaining({
        attributes: { exclude: ['password', 'verificationToken'] },
      }));
      expect(jwt.sign).toHaveBeenCalled();
      expect(createUserJwt).toHaveBeenCalledWith(mockUser);
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, { user: mockUser, token: 'tokenMock' });
    });

    it('should handle errors and return error response', async () => {
      UserMock.findByPk.mockImplementation(() => {
        throw new Error('Database error');
      });

      await getUser(mockReq, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error getting user");
    });
  });

  describe('updateUser', () => {
    const mockReq = {
      body: {
        email: 'updated@example.com',
        firstName: 'Updated',
        lastName: 'User',
        phoneCountryCode: '+1',
        phoneNumber: '1234567890',
      },
    };

    const mockRes = {
      locals: {
        user: {
          uid: 'user123',
        },
      },
    } as any;

    it('should return bad request if nothing to update', async () => {
      await updateUser({ body: {} } as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Nothing to update");
    });

    it('should return bad request if uid is invalid', async () => {
      const res = { ...mockRes, locals: { user: {} } };

      await updateUser(mockReq as any, res);
      expect(sendBadRequest).toHaveBeenCalledWith(res, null, "Invalid uid");
    });

    it('should return not found if user does not exist', async () => {
      UserMock.findByPk.mockResolvedValue(null);

      await updateUser(mockReq as any, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "User not found");
    });

    it('should return bad request if email already in use by another user', async () => {
      UserMock.findByPk.mockResolvedValue({ uid: 'user123' } as any);
      UserMock.findOne.mockResolvedValueOnce({ uid: 'anotherUser123' } as any);

      await updateUser(mockReq as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email already in use");
    });

    it('should return bad request if phone number already in use by another user', async () => {
      UserMock.findByPk.mockResolvedValue({ uid: 'user123' } as any);
      UserMock.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce({ uid: 'anotherUser123' } as any);

      await updateUser(mockReq as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Phone number already in use");
    });

    it('should update user and return success', async () => {
      const userUpdateMock = jest.fn();
      UserMock.findByPk.mockResolvedValue({ uid: 'user123', update: userUpdateMock } as any);
      UserMock.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
      jwtMock.sign.mockReturnValue('tokenMock' as any);
      createUserJwtMock.mockReturnValue({ uid: 'user123' } as any);

      await updateUser(mockReq as any, mockRes);
      expect(userUpdateMock).toHaveBeenCalledWith({ ...mockReq.body });
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, { user: { uid: 'user123' } }, "User updated successfully");
    });

    it('should return error when update fails', async () => {
      UserMock.findByPk.mockResolvedValue({ uid: 'user123', update: jest.fn().mockRejectedValue(new Error('Update error')) } as any);

      await updateUser(mockReq as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error updating user");
    });
  });

  describe('updateUserPassword', () => {
    const mockReq = {
      body: {
        password: 'currentPassword',
        newPassword: 'newPassword123',
      },
    };

    const mockRes = {
      locals: {
        user: {
          uid: 'user123',
        },
      },
    } as any;

    it('should return bad request if password fields are missing', async () => {
      await updateUserPassword({ body: {} } as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Password and newPassword are required");
    });

    it('should return bad request if uid is invalid', async () => {
      const res = { ...mockRes, locals: { user: {} } };

      await updateUserPassword(mockReq as any, res);
      expect(sendBadRequest).toHaveBeenCalledWith(res, null, "Invalid uid");
    });

    it('should return not found if user does not exist', async () => {
      UserMock.findByPk.mockResolvedValue(null);

      await updateUserPassword(mockReq as any, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "User not found");
    });

    it('should return unauthorized if current password is invalid', async () => {
      UserMock.findByPk.mockResolvedValue({ password: 'hashedPassword' } as any);
      bcryptMock.compareSync.mockReturnValue(false);

      await updateUserPassword(mockReq as any, mockRes);
      expect(sendUnauthorized).toHaveBeenCalledWith(mockRes, null, "Authentication failed");
    });

    it('should update password and return success', async () => {
      const userUpdateMock = jest.fn();
      UserMock.findByPk.mockResolvedValue({ password: 'hashedPassword', update: userUpdateMock } as any);
      bcryptMock.compareSync.mockReturnValue(true);
      createUserJwtMock.mockReturnValue({ uid: 'user123' } as any);

      await updateUserPassword(mockReq as any, mockRes);
      expect(userUpdateMock).toHaveBeenCalledWith({
        password: mockReq.body.newPassword
      });
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, { user: { uid: 'user123' } }, "Password updated successfully");
    });

    it('should return error when update fails', async () => {
      UserMock.findByPk.mockResolvedValue({ password: 'hashedPassword', update: jest.fn().mockRejectedValue(new Error('Update error')) } as any);
      bcryptMock.compareSync.mockReturnValue(true);

      await updateUserPassword(mockReq as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error updating user password");
    });
  });

  describe('deleteUser', () => {
    const mockRes = {
      locals: {
        user: {
          uid: 'user123',
        },
      },
    } as any;

    it('should return bad request if uid is invalid', async () => {
      const res = { ...mockRes, locals: { user: {} } };

      await deleteUser({} as any, res);
      expect(sendBadRequest).toHaveBeenCalledWith(res, null, "Invalid uid");
    });

    it('should return not found if user does not exist', async () => {
      UserMock.findByPk.mockResolvedValue(null);

      await deleteUser({} as any, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "User not found");
    });

    it('should delete user and return success', async () => {
      const userDestroyMock = jest.fn();
      UserMock.findByPk.mockResolvedValue({ destroy: userDestroyMock } as any);

      await deleteUser({} as any, mockRes);
      expect(userDestroyMock).toHaveBeenCalled();
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, null, "User deleted successfully");
    });

    it('should return error when deletion fails', async () => {
      UserMock.findByPk.mockResolvedValue({ destroy: jest.fn().mockRejectedValue(new Error('Deletion error')) } as any);

      await deleteUser({} as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error deleting user");
    });
  });
});
