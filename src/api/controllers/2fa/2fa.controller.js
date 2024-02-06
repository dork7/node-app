
const speakeasy = require('speakeasy');
const qrcodeFile = require('qrcode');
var qrcode = require('qrcode-terminal');
const { redisClient } = require('../../../config/redis');
const path = require('path');
const { uploadImageOnCloudinary } = require('../../services/imageProvider');

const REDIS_KEY = '2FA-KEYS'

exports.generateQRCode = async (req, res, next) => {
    try {

        const secret = speakeasy.generateSecret();


        let keys = JSON.parse(await redisClient.get(REDIS_KEY));
        if (!keys) { keys = [secret] } else {
            keys.push(secret)
        }

        redisClient.set(REDIS_KEY, JSON.stringify(keys));


        qrcodeFile.toFile(
            path.join(__dirname, 'qrcode.png'),
            secret.otpauth_url,
            { color: { dark: '#000', light: '#fff' } },
            async (err) => {

                if (err) {
                    return next(err);
                }
                let QR_IMG_URL = await uploadImageOnCloudinary([path.join(__dirname, 'qrcode.png')])
                console.log('uploadResp', QR_IMG_URL[0].url)

                qrcode.generate(secret.otpauth_url, function (qrcode, err) {
                    if (err) {
                        throw new APIError({
                            message: "Unable to generate QR code",
                            errors: "err",
                            isPublic: true,
                        })
                    }
                    console.log(qrcode);
                    res.send({ message: "Generated", QR_IMG_URL: QR_IMG_URL[0].url });
                });

            }
        );



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

