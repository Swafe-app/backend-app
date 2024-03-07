import createUserJwt from '../../src/helpers/createUserJwt';
import User from '../../src/models/users';

describe('createUserJwt helper', () => {
  it('should correctly create JWT payload from user object', () => {
    const fakeUser: Partial<User> = {
      uid: '123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      phoneCountryCode: '+1',
      phoneNumber: '1234567890',
      password: 'password123',
      emailVerified: true,
      phoneVerified: false,
      role: 'user',
      verificationToken: 'token',
      selfie: 'path/to/selfie.jpg',
      selfieStatus: 'verified',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };

    const jwtPayload = createUserJwt(fakeUser as User);

    expect(jwtPayload).toEqual({
      uid: '123',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      phoneCountryCode: '+1',
      phoneNumber: '1234567890',
      emailVerified: true,
      phoneVerified: false,
      role: 'user',
      selfie: 'path/to/selfie.jpg',
      selfieStatus: 'verified',
    });
  });
});
