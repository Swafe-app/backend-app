import checkIsAdmin from '../../src/middleware/checkIsAdmin';
import { sendUnauthorized } from '../../src/helpers/response';

jest.mock('../../src/helpers/response', () => ({
  sendUnauthorized: jest.fn(),
}));

describe('checkIsAdmin middleware', () => {
  let res: any;
  const nextFunction = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    res = {
      locals: {
        user: {}
      }
    };
  });

  it('should call next() when user is admin', () => {
    res.locals.user.role = 'admin';

    checkIsAdmin({} as any, res as any, nextFunction);

    expect(nextFunction).toHaveBeenCalledTimes(1);
    expect(sendUnauthorized).not.toHaveBeenCalled();
  });

  it('should send unauthorized when user is not admin', () => {
    res.locals.user.role = 'user';

    checkIsAdmin({} as any, res as any, nextFunction);

    expect(sendUnauthorized).toHaveBeenCalledWith(res, null, "Access denied. Admin only");
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should send unauthorized when user role is missing', () => {
    res.locals.user = {};

    checkIsAdmin({} as any, res as any, nextFunction);

    expect(sendUnauthorized).toHaveBeenCalledWith(res, null, "Access denied. Admin only");
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
