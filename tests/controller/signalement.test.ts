import {createSignalement, getSignalement, getSignalements} from '../../src/controllers/signalement';
import {sendBadRequest, sendError, sendNotFound, sendSuccess,} from '../../src/helpers/response';
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
            await createSignalement({body: {}} as any, resMock);
            expect(sendBadRequest).toHaveBeenCalledWith(resMock, null, "Invalid data provided");
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
    describe('getSignalements', () => {
        const mockRes = "res" as any;

        it('should return not found if no signalements exist', async () => {
            SignalementMock.findAll.mockResolvedValue([]);

            await getSignalements({} as any, mockRes);
            expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "Signalements not found");
        });

        it('should return list of signalements if signalements exist', async () => {
            const signalements = [
                { id: 1, coordinates: '1.234,5.678', selectedDangerItems: ['item1', 'item2'] },
                { id: 2, coordinates: '1.234,5.678', selectedDangerItems: ['item1', 'item2'] },
            ];
            SignalementMock.findAll.mockResolvedValue(signalements as any);

            await getSignalements({} as any, mockRes);
            expect(sendSuccess).toHaveBeenCalledWith(mockRes, signalements);
        });

        it('should return error if there is a problem listing signalements', async () => {
            SignalementMock.findAll.mockRejectedValue(new Error('Database error'));

            await getSignalements({} as any, mockRes);
            expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error while getting signalements");
        });
    });

    describe('getSignalement', () => {
        const mockReq = { params: { id: 1 } } as any;

        const mockRes = "res" as any;

        it('should return not found if signalement does not exist', async () => {
            SignalementMock.findByPk.mockResolvedValue(null);

            await getSignalement(mockReq, mockRes);
            expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "Signalement not found");
        });

        it('should return success with signalement  if signalement exists', async () => {
            const mockSignalement = {
                id: 1,
                coordinates: '1.234,5.678',
                selectedDangerItems: ['item1', 'item2'],
            };
            SignalementMock.findByPk.mockResolvedValue(mockSignalement as any);

            await getSignalement(mockReq, mockRes);
            expect(Signalement.findByPk).toHaveBeenCalledWith(1);
            expect(sendSuccess).toHaveBeenCalledWith(mockRes, { ...mockSignalement });
        });

        it('should handle errors and return error response', async () => {
            SignalementMock.findByPk.mockImplementation(() => {
                throw new Error('Database error');
            });

            await getSignalement(mockReq, mockRes);
            expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error while getting signalement");
        });
    });
});
