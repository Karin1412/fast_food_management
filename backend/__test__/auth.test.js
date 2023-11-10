const { handleLogin } = require('../controller/auth/authController')
const Account = require('../model/auth/Account')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dummy = require('../__mock__/dummy')
//mock

jest.mock('../model/auth/Account')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')


describe('handleLogin', () => {
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

        await handleLogin(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ 'message': 'Email and password are required.' })

    })

    test('should return 401 if no account found for the given email', async () => {
        Account.findOne.mockResolvedValueOnce(null)

        await handleLogin(req, res)

        expect(res.sendStatus).toHaveBeenCalledWith(401)
    })

    test('should return 401 if the password does not match', async () => {
        const foundAccount = {
            email: 'test@example.com',
            password: 'hashed-password',
            roles: {}
        };
        Account.findOne.mockResolvedValue(foundAccount);
        bcrypt.compare.mockReturnValue(false)

        await handleLogin(req, res)

        expect(res.sendStatus).toHaveBeenCalledWith(401)
    })

    test('should generate tokens, save refreshToken, set cookie, and return roles and accessToken', async () => {
        const foundAccount = {
            email: 'test@example.com',
            password: 'hashed-password',
            roles: { Admin: 1 },
            save: jest.fn()
        };
        Account.findOne.mockResolvedValue(foundAccount);

        bcrypt.compare.mockReturnValue(true)

        jwt.sign.mockReturnValueOnce('mocked-access-token');
        jwt.sign.mockReturnValueOnce('mocked-refresh-token');

        Account.prototype.save.mockResolvedValue({ email: 'test@example.com', refreshToken: 'mocked-refresh-token' });

        const objectSpy = jest.spyOn(Object, "values")

        await handleLogin(req, res)

        expect(objectSpy).toHaveBeenLastCalledWith({
            Admin: 1
        })
        expect(jwt.sign).toHaveBeenCalledTimes(2)
        expect(res.cookie).toHaveBeenCalledWith('jwt', 'mocked-refresh-token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        });

        expect(res.json).toHaveBeenCalledWith({ roles: [1], accessToken: 'mocked-access-token' });
    })
})

