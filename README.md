# node-express-boilerplate

Node app

@ vercel https://node-app-tau.vercel.app/v1

# run with nginx as a reverse proxy manager

docker-compose command : docker-compose up --scale node-app=2

# status

localhost:3000/v1


# Open graphiql in browser
http://localhost:4000/v1/graphql


Test cases added for most of the routers, yet so many things to do :")

# 2FA
## TO GENERATE TOTP ( MAKE SURE REDIS IS ONLINE )
User below request to generate QR code in terminal
###
```
GET {{host}}/v1/2fa/generateQRCode
```

### After generation of QR code add it in google authenticator
 
### To verify the TOTP, send token

``` 
POST {{host}}/v1/2fa/verifyToken
Content-Type: application/json

{
    "token" : "061050"
}
```
 