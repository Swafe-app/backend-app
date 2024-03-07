import connectWithRetry from '../../src/helpers/connectWithRetry';

describe('connectWithRetry helper', () => {
  jest.useFakeTimers();
  console.log = jest.fn();
  console.error = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should successfully connect without retries', async () => {
    const connectFunction = jest.fn().mockResolvedValue(void 0);

    await connectWithRetry(connectFunction, "Test Service", 3);

    expect(connectFunction).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Test Service | Connection established successfully.");
  });

  // it('should retry until connected', async () => {
  //   const connectFunction = jest.fn()
  //     .mockRejectedValueOnce(new Error("Connection failed"))
  //     .mockResolvedValue(void 0);

  //   await connectWithRetry(connectFunction, "Test Service", 1, 1000);

  //   expect(connectFunction).toHaveBeenCalledTimes(2);
  //   expect(console.log).toHaveBeenCalledWith("Test Service | Retrying connection... (1 retries left)");
  //   expect(console.log).toHaveBeenCalledWith("Test Service | Connection established successfully.");
  // });

  // it('should stop retrying after reaching max retries', async () => {
  //   const connectFunction = jest.fn().mockRejectedValue(new Error("Connection failed"));

  //   await connectWithRetry(connectFunction, "Test Service", 1, 1000);

  //   expect(connectFunction).toHaveBeenCalledTimes(2);
  //   expect(console.log).toHaveBeenCalledWith("Test Service | Retrying connection... (1 retries left)");
  //   expect(console.error).toHaveBeenCalledWith("Test Service | No more retries left.");
  // });
});
