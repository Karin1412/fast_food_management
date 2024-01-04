const dummy = require('../__mock__/dummy')
const Account = require('../model/auth/Account')
const { handleLogout } = require('../controller/auth/logoutController')

jest.mock('../model/auth/Account')


describe('handleLogout', () => {
    let req
    let res

    beforeEach(() => {
        req = dummy.requestMock()
        req.cookies = {
            jwt: 'mock jwt'
        }
        res = dummy.responseMock()
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should return 204 if no refreshToken cookie is present', async () => {
        req.cookies = undefined

        await handleLogout(req, res)

        expect(res.sendStatus).toHaveBeenCalledWith(204)
    })

    test('should delete refreshToken in the database and clear cookie', async () => {
        const foundAccount = {
            refreshToken: "fake refresh token",
            save: jest.fn()
        }
        Account.findOne.mockResolvedValueOnce(foundAccount)
        Account.prototype.save.mockResolvedValue({ refreshToken: '' });

        await handleLogout(req, res)

        expect(Account.findOne).toHaveBeenCalledTimes(1)
        expect(foundAccount.refreshToken).toBe('')
        expect(res.clearCookie).toHaveBeenCalledTimes(1)
        expect(res.sendStatus).toHaveBeenCalledWith(204)
    })
})