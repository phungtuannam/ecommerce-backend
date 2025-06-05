const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils/index");
const { BadRequestError } = require("../core/error.response");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "AMIN",
};

class AccessService {
  static signup = async ({ name, email, password }) => {
      
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
       throw new BadRequestError('Error: Shop already register')
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: RoleShop.SHOP
      });

      if(newShop) {
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,publicKey,privateKey
        })

        if(!keyStore) {
          return {
            code: 'xxx',
            message: 'KeyStore error !!!'
          }
        }

        const tokens = await createTokenPair({userId: newShop._,email},publicKey,privateKey)
        console.log("tokens:::",tokens)

        return {
          code: 201,
          metadata: {
            shop: getInfoData({fields: ['id','name','email'],object: newShop}),
            tokens
          }
        }

      }

  
  };
}

module.exports = AccessService;
