

const tokenCookieName = 'at-tkck'

const setTokenInCookie = (res, token) => {
    res.cookie(tokenCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 24 * 60 * 60 * 1000, // 60 Days
        sameSite: 'Lax',
      });
}
const getTokenFromCookie = (req) => {
    return req.cookies[tokenCookieName];
}

const clearTokenFromCookie = (res) => {
    res.clearCookie(tokenCookieName)
}

module.exports = {
    setTokenInCookie,
    getTokenFromCookie,
    clearTokenFromCookie
}