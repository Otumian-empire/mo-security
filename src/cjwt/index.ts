import jwt from "jsonwebtoken";
import crypto from "crypto";

// Set the secret key for JWT verification
const secretKey = "mysecretkey";

// Generate the Genesis JWT
const genesisPayload = {
    iss: "myissuer",
    sub: "mysubject",
    iat: Math.floor(Date.now() / 1000),
};

const genesisJwt = jwt.sign(genesisPayload, secretKey);

// Generate the second JWT, linked to the previous JWT by its hash
const secondPayload = {
    iss: "myissuer",
    sub: "mysubject",
    iat: Math.floor(Date.now() / 1000),
    prevHash: crypto.createHash("sha256").update(genesisJwt).digest("base64"),
};
const secondJwt = jwt.sign(secondPayload, secretKey);

// Generate the third JWT, linked to the previous JWT by its hash
const thirdPayload = {
    iss: "myissuer",
    sub: "mysubject",
    iat: Math.floor(Date.now() / 1000),
    prevHash: crypto.createHash("sha256").update(secondJwt).digest("base64"),
};
const thirdJwt = jwt.sign(thirdPayload, secretKey);

// Verify the third JWT and its previous JWT in the chain
const thirdDecoded = jwt.verify(thirdJwt, secretKey) as { prevHash: string };
const secondDecoded = jwt.verify(secondJwt, secretKey) as { prevHash: string };
const genesisDecoded = jwt.verify(genesisJwt, secretKey);
const prevHashVerified =
    thirdDecoded.prevHash ===
    crypto.createHash("sha256").update(secondJwt).digest("base64");

console.log("Genesis JWT: ", genesisJwt);
console.log("Second JWT: ", secondJwt);
console.log("Third JWT: ", thirdJwt);
console.log("Third JWT Previous Hash Verified: ", prevHashVerified);
console.log("Genesis JWT Decoded: ", genesisDecoded);
console.log("Second JWT Decoded: ", secondDecoded);
console.log("Third JWT Decoded: ", thirdDecoded);
