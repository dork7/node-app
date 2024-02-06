
const speakeasy = require('speakeasy');
// const qrcode = require('qrcode');
var qrcode = require('qrcode-terminal');
const { redisClient } = require('../../../config/redis');

const REDIS_KEY = '2FA-KEYS'

exports.generateQRCode = async (req, res, next) => {
    try {

        const secret = speakeasy.generateSecret();
        let keys = JSON.parse(await redisClient.get(REDIS_KEY));
        if (!keys) { keys = [secret] } else {
            keys.push(secret)
        }
        redisClient.set(REDIS_KEY, JSON.stringify(keys));



        qrcode.generate(secret.otpauth_url, function (qrcode, err) {
            if (err) {
                throw new APIError({
                    message: "Unable to generate QR code",
                    errors: "err",
                    isPublic: true,
                })
            }
            console.log(qrcode);
            res.send({ message: "Generated" });
        });

    } catch (error) {
        return next(error);
    }
};
exports.verifyToken = async (req, res, next) => {
    try {

        const userToken = req.body.token;
        // getting stored tokens from redis
        let keys = JSON.parse(await redisClient.get(REDIS_KEY));

        let verified = false
        keys.forEach(element => {
            // Verify the token against the secret
            const token = speakeasy.totp({
                // passing secret of the generated token
                secret: element.base32,
                encoding: 'base32'
            });
            if (token === userToken) {
                verified = true;
                return;
            }
        });

        if (verified) {
            res.send('Token is valid');
        } else {
            res.status(401).send('Token is invalid');
        }
    } catch (error) {
        return next(error);
    }
};

