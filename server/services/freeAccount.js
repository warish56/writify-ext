

const userIdCookieName = 'ut-atk';

const setFreeUserIdInCookie = (res, randomId) => {
    res.cookie(userIdCookieName, randomId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 24 * 60 * 60 * 1000, // 60 Days
        sameSite: 'Lax',
      });
}

const getFreeUserIdFromCookie = (req) => {
    return req.cookies[userIdCookieName];
}

const clearFreeUserIdFromCookie = (res) => {
    res.clearCookie(userIdCookieName)
}

module.exports = {
    setFreeUserIdInCookie,
    getFreeUserIdFromCookie,
    clearFreeUserIdFromCookie
}