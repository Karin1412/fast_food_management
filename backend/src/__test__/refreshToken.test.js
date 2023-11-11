const { handleRefreshToken } = require('../controller/auth/refreshTokenController');
const Account = require('../model/auth/Account');
const jwt = require('jsonwebtoken');
const dummy = require('../__mock__/dummy')

jest.mock('jsonwebtoken');
jest.mock('../model/auth/Account')

describe('handleRefreshToken', () => {
    let req;
    let res;

    beforeEach(() => {
        req = dummy.requestMock()
        req.cookies = {
            jwt: 'mocked-refresh-token',
        }

        res = dummy.responseMock()
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return 401 if jwt cookie is not present', async () => {
        req.cookies.jwt = undefined;

        await handleRefreshToken(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    test('should return 403 if no account found for the given refresh token', async () => {

        Account.findOne.mockResolvedValue(null);

        await handleRefreshToken(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test('should return 403 if jwt verification fails', async () => {
        // Mock Account.findOne to return a valid account
        const foundAccount = {
            refreshToken: 'mocked-refresh-token',
            email: 'test@example.com',
            roles: {}
        };
        Account.findOne.mockResolvedValue(foundAccount);

        // Mock jwt.verify to invoke the error callback
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback('mocked-error', null);
        });

        await handleRefreshToken(req, res);

        expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    test('should generate a new access token and return it along with roles', async () => {
        const foundAccount = {
            refreshToken: 'mocked-refresh-token',
            email: 'test@example.com',
            roles: {
                Admin: 1
            }
        };
        Account.findOne.mockResolvedValue(foundAccount);

        // Mock jwt.verify to return a decoded object
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(null, { email: 'test@example.com' });
        });

        // Mock jwt.sign to return a mocked access token
        jwt.sign.mockReturnValue('mocked-access-token');

        await handleRefreshToken(req, res);

        expect(res.json).toHaveBeenCalledWith(
            {
                roles: [1],
                accessToken: 'mocked-access-token'
            }
        );
    });
});
