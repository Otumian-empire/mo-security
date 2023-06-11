// Generate subsequent jwt
import "dotenv/config";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const secretKey = process.env.CJWT_SECRET as string; // Replace with your secret key

const previousJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyLWlzc3Vlci1oZXJlIiwic3ViIjoiZ2VuZXNpcyIsImlhdCI6MTY4MTA4MjgzNywicHJldkhhc2giOm51bGwsImV4cCI6MTY4MTE2OTIzN30.woKE07uw6431CdsxCZsl-6e1qDrjBTYDFGLsSYhYxaU";

// Generate the hash of the previous JWT
const previousHash = crypto
    .createHash("sha256")
    .update(previousJwt)
    .digest("hex");

// Define the payload for the next JWT
const payload = {
    iss: "your-issuer-here",
    sub: "your-subject-here",
    iat: Math.floor(Date.now() / 1000),
    prev: previousHash,
    // Add any other claims or data as needed
};

// Sign the payload to create the new JWT
const nextJwt = jwt.sign(payload, secretKey);

console.log(nextJwt);
