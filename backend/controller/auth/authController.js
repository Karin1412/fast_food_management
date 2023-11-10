const Account = require('../../model/auth/Account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ 'message': 'Email and password are required.' });

    const foundAccount = await Account.findOne({ email: email });
    if (!foundAccount) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundAccount.password);
    if (match) {
        const roles = Object.values(foundAccount.roles);

        // create JWTs
        const accessToken = jwt.sign(
            {
                "AccountInfo": {
                    "email": foundAccount.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s' }
        );
        const refreshToken = jwt.sign(
            { "email": foundAccount.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        foundAccount.refreshToken = refreshToken;
        const result = await foundAccount.save();
        console.log(result);
        console.log(roles);

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000
        });

        // Send authorization roles and access token to user
        res.json({
            roles: roles,
            accessToken: accessToken
            // user: user
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };