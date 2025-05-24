const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils/index");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "AMIN",
};

class AccessService {
  static signup = async ({ name, email, password }) => {
    try {
      //check email already
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxx",
          message: "shop already register",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: RoleShop.SHOP,
      });

      if (newShop) {
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        console.log("private key and publickey:::", privateKey, publicKey);

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          privateKey,
          publicKey,
        });

        if(!keyStore) {
          return {
            code: 'xxx',
            message: 'keyStore error!!!'
          }
        }

        const tokens = await createTokenPair({userId: newShop.id,email},privateKey,publicKey)
        console.log("tokens:::",tokens)
        return {
          code: 201,
          metadata: {
            shop: getInfoData({fields: ['id','name','email'],object: newShop}),
            tokens
          }
        }

      }

    

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxxx",
        message: message.error,
        status: error,
      };
    }
  };
}

module.exports = AccessService;
