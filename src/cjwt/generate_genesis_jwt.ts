// Generate the genesis jwt
import "dotenv/config";
import jwt from "jsonwebtoken";

const secretKey = process.env.CJWT_SECRET as string; // Replace with your secret key

const genesisPayload = {
    iss: "your-issuer-here",
    sub: "genesis",
    iat: Math.floor(Date.now() / 1000),
    prevHash: null, // Set previous hash to null for the genesis JWT
};

const genesisOptions = {
    expiresIn: "1d",
};

const genesisToken = jwt.sign(genesisPayload, secretKey, genesisOptions);

console.log(genesisToken);
