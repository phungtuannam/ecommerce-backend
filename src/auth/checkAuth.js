const { findById } = require("../services/apiKey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key) {
      return res.status(403).json({
        message: "Forbidden error",
      });
    }

    const objKey = await findById(key);
    console.log(objKey);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden error",
      });
    }

    req.objKey = objKey;
    return next();
  } catch (error) {}
};

const permisssion = (permisssion) => {
  return (req, res, next) => {
    if (!req.objKey.permisssions) {
      return res.status(403).json({
        message: "permission denied",
      });
    }

    console.log("permisssion::",req.objKey.permisssions);
    const validPermission = req.objKey.permisssions.includes(permisssion)
    if(!validPermission) {
        return res.status(403).json({
            message: 'permission denied',
        })
    }

    return next()
  };
};

const asyncHandler = fn => {
  return (req,res,next) => {
    fn(req,res,next).catch(next)
  }
}

module.exports = {
  apiKey,
  permisssion,
  asyncHandler
};
