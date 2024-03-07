import {
    createSignalement, deleteSignalement,
    getSignalement,
    getSignalements,
    getUserSignalements, updateSignalement
} from '../../src/controllers/signalement';
import {sendBadRequest, sendError, sendNotFound, sendSuccess} from '../../src/helpers/response';
import Signalement from "../../src/models/signalement";
import {ValidationError, ValidationErrorItem} from "sequelize";

const SignalementMock = Signalement as jest.Mocked<typeof Signalement>;

jest.mock('../../src/models/signalement');
jest.mock('../../src/helpers/response', () => ({
    sendBadRequest: jest.fn(),
    sendSuccess: jest.fn(),
    sendError: jest.fn(),
    sendNotFound: jest.fn(),
}));

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

        it('should return bad request if selectedDangerItems is invalid', async () => {
            const validationError = new ValidationError('Validation error', [
                new ValidationErrorItem(
                    `Invalid value in selectedDangerItems: ${mockReq.body.selectedDangerItems[0]}`, // message
                    'validation error', // type
                    'selectedDangerItems', // path
                    mockReq.body.selectedDangerItems[0], // value
                    null as any, // instance
                    '', // validatorKey
                    '', // origin
                    [] // validatorArgs
                ),
                new ValidationErrorItem(
                    `Invalid value in selectedDangerItems: ${mockReq.body.selectedDangerItems[1]}`, // message
                    'validation error', // type
                    'selectedDangerItems', // path
                    mockReq.body.selectedDangerItems[1], // value
                    null as any, // instance
                    '', // validatorKey
                    '', // origin
                    [] // validatorArgs
                ),
            ]);

            SignalementMock.create.mockRejectedValue(validationError);

            await createSignalement(mockReq as any, resMock);
            expect(sendBadRequest).toHaveBeenCalledWith(resMock, validationError, "Invalid data provided in selectedDangerItems");
        });

    })

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

    describe('getUserSignalements', () => {
        const mockReq = "req" as any;
        const resMock = { locals: {user: {uid: 1}}} as any;

        it('should return bad request if uid is invalid', async () => {
            const res = { locals: {user: { }}} as any;

            await getUserSignalements(mockReq, res);
            expect(sendBadRequest).toHaveBeenCalledWith(res, null, "Invalid uid");
        });

        it('should return not found if no signalements exist for the user', async () => {
            SignalementMock.findAll.mockResolvedValue([]);

            await getUserSignalements({} as any, resMock);
            expect(sendNotFound).toHaveBeenCalledWith(resMock, null, "Signalements not found for this user");
        });

        it('should return list of signalements if signalements exist for the user', async () => {
            const signalements = [
                { id: 1, coordinates: '1.234,5.678', selectedDangerItems: ['item1', 'item2'] },
                { id: 2, coordinates: '1.234,5.678', selectedDangerItems: ['item1', 'item2'] },
            ];
            SignalementMock.findAll.mockResolvedValue(signalements as any);

            await getUserSignalements({} as any, resMock);
            expect(sendSuccess).toHaveBeenCalledWith(resMock, signalements);
        });

        it('should return error if there is a problem listing signalements', async () => {
            SignalementMock.findAll.mockRejectedValue(new Error('Database error'));

            await getUserSignalements({} as any, resMock);
            expect(sendError).toHaveBeenCalledWith(resMock, expect.anything(), "Error while getting user signalements");
        });
    });

    describe('updateSignalement', () => {
        const mockReq = { params: { id: 1 }, body: { coordinates: '1.234,5.678', selectedDangerItems: ['item1', 'item2'] } } as any;

        const resMock = { locals: {user: {uid: 1}} } as any;

        it('should return bad request if coordinates or selectedDangerItems is missing', async () => {
            await updateSignalement({params: { id: 1 }, body: {}} as any, resMock);
            expect(sendBadRequest).toHaveBeenCalledWith(resMock, null, "Invalid data provided");
        });

        it('should return bad request if uid is invalid', async () => {
            const res = { locals: {user: { }}} as any;

            await updateSignalement(mockReq as any, res);
            expect(sendBadRequest).toHaveBeenCalledWith(res, null, "Invalid uid");
        });

        it('should return not found if signalement does not exist', async () => {
            SignalementMock.findByPk.mockResolvedValue(null);

            await updateSignalement(mockReq, resMock);
            expect(sendNotFound).toHaveBeenCalledWith(resMock, null, "Signalement not found");
        });

        it('should return success with signalement  if signalement exists', async () => {
            const signalementUpdateMock = jest.fn();
            SignalementMock.findByPk.mockResolvedValue({ id: 1, userId: 1, update: signalementUpdateMock } as any);
            SignalementMock.findOne.mockResolvedValueOnce(null).mockResolvedValueOnce(null);

            await updateSignalement(mockReq as any, resMock);
            expect(signalementUpdateMock).toHaveBeenCalledWith({... mockReq.body});
            expect(sendSuccess).toHaveBeenCalledWith(resMock, { id: 1, userId: 1, update: signalementUpdateMock } , "Signalement updated successfully");
        });

        it('should handle errors and return error response', async () => {
            SignalementMock.findByPk.mockImplementation(() => {
                throw new Error('Database error');
            });

            await updateSignalement(mockReq, resMock);
            expect(sendError).toHaveBeenCalledWith(resMock, expect.anything(), "Error while updating signalement");
        });

        it('should return bad request if selectedDangerItems is invalid', async () => {

            const validationError = new ValidationError('Validation error', [
                new ValidationErrorItem(
                    `Invalid value in selectedDangerItems: ${mockReq.body.selectedDangerItems[0]}`, // message
                    'validation error', // type
                    'selectedDangerItems', // path
                    mockReq.body.selectedDangerItems[0], // value
                    null as any, // instance
                    '', // validatorKey
                    '', // origin
                    [] // validatorArgs
                ),
                new ValidationErrorItem(
                    `Invalid value in selectedDangerItems: ${mockReq.body.selectedDangerItems[1]}`, // message
                    'validation error', // type
                    'selectedDangerItems', // path
                    mockReq.body.selectedDangerItems[1], // value
                    null as any, // instance
                    '', // validatorKey
                    '', // origin
                    [] // validatorArgs
                ),
            ]);
            const mockSignalement = {
                userId: resMock.locals.user.uid,
                update: jest.fn().mockRejectedValue(validationError),
            };

            SignalementMock.findByPk.mockResolvedValue(mockSignalement as any);

            await updateSignalement(mockReq as any, resMock);
            expect(sendBadRequest).toHaveBeenCalledWith(resMock, validationError, "Invalid data provided in selectedDangerItems");
        });

    },);

    describe('deleteSignalement', () => {
        const mockReq = { params: { id: 1 } } as any;
        const mockRes = { locals: {user: {uid: 1}} } as any;

        it('should delete signalement and return success', async () => {
            const mockSignalement = { userId: mockRes.locals.user.uid, destroy: jest.fn().mockResolvedValue({}) } as any;
            SignalementMock.findByPk.mockResolvedValue(mockSignalement);

            await deleteSignalement(mockReq, mockRes);
            expect(Signalement.findByPk).toHaveBeenCalledWith(mockReq.params.id);
            expect(mockSignalement.destroy).toHaveBeenCalled();
            expect(sendSuccess).toHaveBeenCalledWith(mockRes, { message: "Signalement deleted successfully" });
        });

        it('should return not found if signalement does not exist', async () => {
            SignalementMock.destroy.mockResolvedValue(0);

            await deleteSignalement(mockReq, mockRes);
            expect(sendNotFound).toHaveBeenCalledWith(mockRes, null, "Signalement not found");
        });

        it('should handle errors and return error response', async () => {
            SignalementMock.findByPk.mockResolvedValue({ userId: mockRes.locals.user.uid, destroy: jest.fn().mockRejectedValue(new Error('Deletion error')) } as any);

            await deleteSignalement(mockReq, mockRes);
            expect(sendError).toHaveBeenCalledWith(mockRes, expect.anything(), "Error while deleting signalement");
        });
    });
});
