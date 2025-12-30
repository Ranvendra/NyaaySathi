const { verifyToken } = require("../utils/jwt");

async function authMiddleware(req, res, next){
    try{
        const token = req.cookies.token;
        if (!token){
            return res.status(401).json({ error: "Authentication token missing" });
        }
        const decoded = verifyToken(token);
        req.user = decoded;

        next()

    } catch(err){
        return res.status(403).json({error: "Invalid or Expired Token"})
    }
}

module.exports = { authMiddleware };