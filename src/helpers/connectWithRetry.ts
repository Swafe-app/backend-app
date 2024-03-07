const connectWithRetry = async (
    connectFunction: () => Promise<void>,
    serviceTitle: string,
    retries: number = 0,
    delay: number = 7000
): Promise<void> => {
    try {
        await connectFunction();
        console.log(`${serviceTitle} | Connection established successfully.`);
        return;
    } catch (err) {
        console.error(`${serviceTitle} | Connection failed:`, err);
        if (retries === 0) {
            console.error(`${serviceTitle} | No more retries left.`);
            return;
        }
        console.log(`${serviceTitle} | Retrying connection... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        await connectWithRetry(connectFunction, serviceTitle, retries - 1, delay);
    }
};

export default connectWithRetry;
