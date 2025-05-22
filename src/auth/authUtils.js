const JWT = require("jsonwebtoken");
const createTokenPair = async ( payload, publicKey, privateKey) => {
  const accessToken = await JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "2days",
  });
  const refreshToken = await JWT.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "7days",
  });

  JWT.verify(accessToken, publicKey, (err, decode) => {
    if (err) {
      console.log("error verify:", err);
    } else {
      console.log("decode verify:", decode);
    }
  });

  return { accessToken, refreshToken };
};

module.exports = {
  createTokenPair,
};
