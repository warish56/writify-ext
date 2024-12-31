
const getRequestIpAddress = (req) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    return ipAddress === '::1' ? '127.0.0.1' : ipAddress
}

module.exports={
    getRequestIpAddress
}