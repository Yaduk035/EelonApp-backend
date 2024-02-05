const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, nxt) => {
  const authHeader = req.header.authorization || req.header.Authorization;
  if (!authHeader?.startsWith("Bearer"))
    return res
      .status(401)
      .json({
        message: "Authheader doesn't starts with bearer",
        success: false,
      });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Invalid token", success: false });
    console.log(decoded);
    req.email = decoded?.email;
    req.roles = decoded?.roles;
    req.userId = decoded?.userId;
    nxt();
  });
};
module.exports = verifyJwt;
