export const stripe = {
    charges: {
        // return a promise that resolves itself
        create: jest.fn().mockResolvedValue({
            id: 'gsd'
        })
    }
};