import { createAdmin, getAdmins, getUsers, updateUserSelfieStatus } from '../../src/controllers/admin';
import createUserJwt from '../../src/helpers/createUserJwt';
import { sendBadRequest, sendSuccess, sendError, sendNotFound } from '../../src/helpers/response';
import User from '../../src/models/users';
import jwt from 'jsonwebtoken';

const jwtMock = jwt as jest.Mocked<typeof jwt>;
const UserMock = User as jest.Mocked<typeof User>;
const createUserJwtMock = createUserJwt as jest.MockedFunction<typeof createUserJwt>;

jest.mock('../../src/models/users');
jest.mock('jsonwebtoken');
jest.mock('../../src/helpers/response', () => ({
  sendBadRequest: jest.fn(),
  sendUnauthorized: jest.fn(),
  sendSuccess: jest.fn(),
  sendError: jest.fn(),
  sendNotFound: jest.fn(),
}));
jest.mock('../../src/helpers/createUserJwt');

describe('Admin controller', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('createAdmin', () => {
    const mockReq = {
      body: {
        email: 'admin@example.com',
        password: 'adminPassword',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      },
    };

    const mockRes = "res" as any;

    it('should return bad request if required fields are missing', async () => {
      const req = { body: {} };

      await createAdmin(req as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email, password, firstName, and lastName are required");
    });

    it('should return bad request if email is already in use', async () => {
      UserMock.findOne.mockResolvedValue(true as any);

      await createAdmin(mockReq as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Email already in use");
    });

    it('should create admin and return success', async () => {
      UserMock.findOne.mockResolvedValue(null);
      UserMock.create.mockResolvedValue(mockReq.body);
      jwtMock.sign.mockReturnValue('adminToken' as any);
      createUserJwtMock.mockReturnValue({ ...mockReq.body } as any);

      await createAdmin(mockReq as any, mockRes);
      expect(User.create).toHaveBeenCalledWith({ ...mockReq.body });
      expect(jwt.sign).toHaveBeenCalled();
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, { admin: { ...mockReq.body }, token: 'adminToken' });
    });

    it('should return error if admin creation fails', async () => {
      UserMock.findOne.mockResolvedValue(null);
      UserMock.create.mockRejectedValue(new Error('Creation error'));

      await createAdmin(mockReq as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error creating admin");
    });
  });

  describe('getUsers', () => {
    const mockRes = "res" as any;

    it('should return not found if no users exist', async () => {
      UserMock.findAll.mockResolvedValue([]);

      await getUsers({} as any, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "Users not found");
    });

    it('should return list of users if users exist', async () => {
      const users = [
        { id: 1, email: 'user1@example.com', firstName: 'User', lastName: 'One', role: 'user' },
        { id: 2, email: 'user2@example.com', firstName: 'User', lastName: 'Two', role: 'user' },
      ];
      UserMock.findAll.mockResolvedValue(users as any);

      await getUsers({} as any, mockRes);
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, users);
    });

    it('should return error if there is a problem listing users', async () => {
      UserMock.findAll.mockRejectedValue(new Error('Database error'));

      await getUsers({} as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error listing users");
    });
  });

  describe('getAdmins', () => {
    const mockRes = "res" as any;

    it('should return not found if no admins exist', async () => {
      UserMock.findAll.mockResolvedValue([]);

      await getAdmins({} as any, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "Users not found");
    });

    it('should return list of admins if admins exist', async () => {
      const admins = [
        { id: 1, email: 'admin1@example.com', firstName: 'Admin', lastName: 'One', role: 'admin' },
        { id: 2, email: 'admin2@example.com', firstName: 'Admin', lastName: 'Two', role: 'admin' },
      ];
      UserMock.findAll.mockResolvedValue(admins as any);

      await getAdmins({} as any, mockRes);
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, admins);
    });

    it('should return error if there is a problem listing admins', async () => {
      UserMock.findAll.mockRejectedValue(new Error('Database error'));

      await getAdmins({} as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error listing users");
    });
  });

  describe('updateUserSelfieStatus', () => {
    const mockReq = {
      body: {
        selfieStatus: 'validated',
        uid: 'user123',
      },
    };

    const mockRes = "res" as any;

    it('should return bad request if required fields are missing', async () => {
      await updateUserSelfieStatus({ body: {} } as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "selfieStatus and uid are required");
    });

    it('should return bad request if selfieStatus is invalid', async () => {
      const invalidReq = { body: { selfieStatus: 'invalid_status', uid: 'user123' } };

      await updateUserSelfieStatus(invalidReq as any, mockRes);
      expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "selfieStatus must be validated, refused, pending or not_defined");
    });

    it('should return not found if user does not exist', async () => {
      UserMock.findByPk.mockResolvedValue(null);

      await updateUserSelfieStatus(mockReq as any, mockRes);
      expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "User not found");
    });

    it('should update user selfie status and return success', async () => {
      const userUpdateMock = jest.fn();
      UserMock.findByPk.mockResolvedValue({ update: userUpdateMock } as any);

      await updateUserSelfieStatus(mockReq as any, mockRes);
      expect(userUpdateMock).toHaveBeenCalledWith({ selfieStatus: 'validated' });
      expect(sendSuccess).toHaveBeenCalledWith(mockRes, expect.anything());
    });

    it('should return error if updating user fails', async () => {
      UserMock.findByPk.mockResolvedValue({ update: jest.fn().mockRejectedValue(new Error('Update error')) } as any);

      await updateUserSelfieStatus(mockReq as any, mockRes);
      expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error updating user");
    });
  });
});
