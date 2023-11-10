const requestMock = () => ({
    body: {
        email: 'test@example.com',
        password: 'password123',
    },
})

const responseMock = () => ({
    status: jest.fn((x) => x).mockReturnThis(),
    json: jest.fn((x) => x).mockReturnThis(),
    sendStatus: jest.fn(x => x),
    cookie: jest.fn(),
    clearCookie: jest.fn()
})

module.exports = {
    requestMock,
    responseMock
}