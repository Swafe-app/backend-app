import {createSignalement} from '../../src/controllers/signalement';
import {sendBadRequest, sendError, sendSuccess,} from '../../src/helpers/response';
import Signalement from "../../src/models/signalement";

const SignalementMock = Signalement as jest.Mocked<typeof Signalement>;

jest.mock('../../src/models/signalement');
jest.mock('jsonwebtoken');
jest.mock('../../src/helpers/deleteFile');
jest.mock('../../src/helpers/response', () => ({
    sendBadRequest: jest.fn(),
    sendUnauthorized: jest.fn(),
    sendSuccess: jest.fn(),
    sendError: jest.fn(),
    sendNotFound: jest.fn(),
}));
jest.mock('../../src/helpers/createUserJwt');

describe('Signalement controller', () => {

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('createSignalement', () => {
        const mockReq = {
            body: {
                coordinates: '1.234,5.678',
                selectedDangerItems: ['item1', 'item2'],
            },
        };

        const mockRes = "res" as any;
        const resMock = {...mockRes, locals: {user: {uid: 1}}};

        it('should return bad request if coordinates or selectedDangerItems is missing', async () => {
            await createSignalement({body: {}} as any, mockRes);
            expect(sendBadRequest).toHaveBeenCalledWith(mockRes, null, "Invalid data provided");
        });

        it('should return bad request if uid is invalid', async () => {
            const res = {...mockRes, locals: {user: {}}};

            await createSignalement(mockReq as any, res);
            expect(sendBadRequest).toHaveBeenCalledWith(res, null, "Invalid uid");
        });

        it('should return error if signalement creation fails', async () => {
            SignalementMock.findOne.mockResolvedValue(null);
            SignalementMock.create.mockRejectedValue(new Error('Creation error'));
            await createSignalement(mockReq as any, resMock);
            expect(sendError).toHaveBeenCalledWith(resMock, expect.anything(), "Error while creating signalement");
        });

        it('should create signalement and return success', async () => {
            SignalementMock.create.mockResolvedValue(mockReq.body);
            await createSignalement(mockReq as any, resMock);
            expect(Signalement.create).toHaveBeenCalledWith({ ...mockReq.body, userId: resMock.locals.user.uid });
            expect(sendSuccess).toHaveBeenCalledWith(resMock, {  ...mockReq.body }, "Signalement created successfully");
        });

    });
});
