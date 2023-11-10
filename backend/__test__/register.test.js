const { handleNewUser } = require('../controller/auth/registerController');
const bcrypt = require('bcrypt');
const Account = require('../model/auth/Account');
const dummy = require('../__mock__/dummy')


jest.mock('bcrypt');
jest.mock('../model/auth/Account')

describe('handleNewUser', () => {
    let req;
    let res;

    beforeEach(() => {
        req = dummy.requestMock()
        res = dummy.responseMock()
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return 400 if email or password is missing', async () => {
        req.body.email = undefined;

        await handleNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email and password are required.' });
    });

    test('should return 409 if email already exists in the database', async () => {
        Account.findOne.mockResolvedValue({ email: 'test@example.com' });

        await handleNewUser(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(409);
    });

    test('should create a new user and return a success message', async () => {
        Account.findOne.mockResolvedValue(null);

        bcrypt.hash.mockResolvedValue('hashed-password');

        // Mock Account.create to return a result
        Account.create.mockResolvedValue(
            { email: 'test@example.com', password: 'hashed-password' }
        );

        await handleNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ success: 'New user test@example.com created!' });
    });

    it('should handle errors and return a 500 status with an error message', async () => {
        // Mock Account.findOne to return null (no duplicate user)
        Account.findOne.mockResolvedValue(null);

        // Mock bcrypt.hash to throw an error
        bcrypt.hash.mockRejectedValue(new Error('Hashing error'));

        await handleNewUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Hashing error' });
    });
});
