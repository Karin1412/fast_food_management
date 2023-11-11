const Account = require('../../model/auth/Account');

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundAccount = await Account.findOne({ refreshToken });
    if (foundAccount) {
        // Delete refreshToken in db
        foundAccount.refreshToken = '';
        const result = await foundAccount.save();
        console.log(result);
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = { handleLogout }