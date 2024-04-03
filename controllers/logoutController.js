const User = require('../model/User');

const handleLogout= async (req, res) => {
    //On client also delete the access Token
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204);
    
    const refreshToken = cookies.jwt;
    //checking refresh token in db
    const foundUser = await User.findOne({ refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
        return res.sendStatus(204);
    }

    //deleting the refresh token
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
  
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true});
    res.sendStatus(204);
       
}

module.exports = { handleLogout };