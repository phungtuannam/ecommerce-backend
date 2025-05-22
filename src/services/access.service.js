const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "AMIN",
};

class AccessService {
  static signup = async ({ name, email, password }) => {
    try {
      // check email already
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
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // created privatekey and publickey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1", // hoặc 'spki'
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1", // hoặc 'pkcs8'
            format: "pem",
          },
        });
        console.log("Privatekey and publikey>>>>", { privateKey, publicKey }); //save collection keyStore
        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });
        
        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "publicKeyString error",
          };
        }
        console.log("publikey string:::",publicKeyString)

        const publickeyObjet = crypto.createPublicKey(publicKeyString)

        console.log("publickeyObject>>>",publickeyObjet)

        //create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publickeyObjet,
          privateKey
        );

        console.log("create token success", tokens);

        return {
          code: 201,
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }

      return {
        code: 200,
        metada: null,
      };
    } catch (error) {
      return {
        code: "xxxx",
        message: error.message,
        status: error,
      };
    }
  };
}

module.exports = AccessService;
