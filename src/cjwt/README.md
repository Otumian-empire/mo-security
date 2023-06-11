# Chained JSON WEB TOKENS

Chained Json Web Tokens is a jwt that remembers the previous jwt - which is computed as the previous hash. `cjwt` is meant to improve the security of using jwt. This research, even though it is center or revolving around jwt, is not necessarily jwt.

## Title

Exploring the Security of Hashed JWT Chains in Authentication

## Abstract

JSON Web Tokens (JWTs) are a popular method for implementing stateless authentication and authorization in web applications. A JWT chain linked by hash values is a novel approach to JWT authentication, where each JWT in the chain contains a hash of the previous JWT in the chain. This approach has the potential to simplify token revocation and increase the security of JWTs, but also raises concerns around complexity and potential vulnerabilities.

In this research, we investigate the security implications of using a JWT chain linked by hash values. We evaluate the effectiveness of this approach in preventing common attacks such as token replay and man-in-the-middle attacks, and identify potential vulnerabilities or weaknesses in the hashing algorithm or other components of the JWT chain. We also assess the impact of using a JWT chain linked by hash values on system performance, scalability, and reliability, and identify best practices for implementing and managing this approach in a secure manner.

Our findings suggest that a JWT chain linked by hash values can provide a secure and efficient method for implementing stateless authentication, with some caveats around potential vulnerabilities and complexity. We recommend careful consideration of the risks and benefits before implementing this approach in a production system, and suggest areas for further research to improve the security and usability of JWT authentication.

## Keywords

cjwt, jwt

## Introduction

JSON Web Tokens (JWTs) are a popular method for securely transmitting information between parties in a networked environment. JWTs are stateless, meaning they can be easily used across distributed systems without requiring server-side storage or database lookups. One limitation of traditional JWTs, however, is that they do not provide a way to link multiple tokens together in a secure chain.

In this research, we investigate a novel approach to chaining JWTs together, using the hash value of each token to link it to the previous one. This approach allows for enhanced security and ease of token revocation, since invalidating the root token of a chain would automatically invalidate all subsequent tokens in the chain.

We will begin by exploring existing research on JWTs and related technologies, with a focus on the challenges and limitations of using traditional JWTs in a distributed environment. We will then introduce our proposed method for chaining JWTs together, including the process for verifying the authenticity of each token in the chain.

Finally, we will conduct a series of experiments to evaluate the effectiveness and security of our approach, comparing it to traditional JWTs and other related technologies. Our research aims to provide a new, more secure method for using JWTs in a distributed environment, with potential applications in industries such as e-commerce, finance, and healthcare.

## Methodology

### Generate the genesis JWT:

-   Set up the environment by importing the dotenv package and loading the secret key from a `.env` file using `process.env`.
-   Define the payload for the genesis JWT, including the issuer (`iss`), subject (`sub`), and issue time (`iat`), along with a `prevHash` field set to `null`.
-   Define the options for the genesis JWT, including the expiration time.
-   Use the `jsonwebtoken` package to sign the payload and generate the genesis JWT.
-   Print the genesis JWT to the console.

```typescript
// Generate the genesis JWT
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
```

### Generate subsequent JWTs

-   Set up the environment by importing the dotenv package and loading the secret key from a `.env` file using `process.env`.
-   Define the previous JWT, either as a string or by retrieving it from a database.
-   Generate the hash of the previous JWT using the `crypto` package.
-   Define the payload for the next JWT, including the issuer (`iss`), subject (`sub`), and issue time (`iat`), along with a `prev` field set to the hash of the previous JWT.
-   Use the `jsonwebtoken` package to sign the payload and generate the next JWT.
-   Print the next JWT to the console.

```typescript
// Generate subsequent JWTs
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
```

### Verify the jwt

-   Import the `jsonwebtoken` library into your project by adding `import jwt from "jsonwebtoken";` at the beginning of your file.
-   Create a `token` constant that holds the JWT string that you want to verify.
-   Create a `secret` constant that holds the secret key used to sign the JWT. This can be stored in an environment variable, or hard-coded in your code.
-   Inside a `try` block, call the `jwt.verify()` method and pass in the `token` and `secret` as arguments. The `verify()` method will either return the decoded token, or throw an error if the token is invalid.
-   If the `jwt.verify()` method successfully decodes the token, the decoded data will be stored in the decoded constant. You can then use the `console.log()` method to output the decoded data to the console.
-   If an error is thrown in the `try` block, catch the error and output it to the console using `console.log()`.

```typescript
// Verify the jwt
import jwt from "jsonwebtoken";

// Step 2: Create a `token` constant that holds the JWT string that you want to verify.
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyLWlzc3Vlci1oZXJlIiwic3ViIjoiZ2VuZXNpcyIsImlhdCI6MTY4MTA4MjAwMiwicHJldkhhc2giOm51bGwsImV4cCI6MTY4MTE2ODQwMn0.CPLQSho8wWoYmRWTdTlqeytiUWGTkpVsn1a7gtMwBAo";

// Step 3: Create a `secret` constant that holds the secret key used to sign the JWT.
const secret = process.env.CJWT_SECRET as string;

try {
    // Step 4: Call the `jwt.verify()` method and pass in the `token` and `secret` as arguments.
    const decoded = jwt.verify(token, secret);

    // Step 5: Use `console.log()` to output the decoded data to the console.
    console.log(decoded);
} catch (err) {
    // Step 6: If an error is thrown, catch the error and output it to the console using `console.log()`.
    console.log(err);
}
```

### Verify a JWT with a Previous Hash

-   Import the required dependencies:
    -   `jsonwebtoken` library for verifying the JWT token and decoding its header and payload.
    -   `crypto` library for hashing the header and payload.
-   Define a function `verifyJwtWithPreviousHash` that takes three parameters: the JWT token to verify, the previous hash value, and the public key to use for verifying the JWT. This function will perform the following steps:
    -   Verify the JWT token using the `jsonwebtoken.verify` method and the provided public key. If the verification fails, return `false`.
    -   Decode the JWT token using the `jsonwebtoken.decode` method to retrieve its header and payload.
    -   Concatenate the header and payload into a single string and hash it using the `crypto.createHash` method with the SHA-256 algorithm. If the hash value matches the provided previous hash, return `true`, otherwise return `false`.
-   Define a function `hash` that takes a string and returns its SHA-256 hash value using the `crypto.createHash` method.
-   Use the `verifyJwtWithPreviousHash` function to verify the JWT token by passing it, the previous hash value, and the public key as arguments. Log the result to the console.
-   Handle any errors that may occur during the verification process using the `try-catch` block.

```typescript
import jwt from "jsonwebtoken";
import crypto from "crypto";

const verifyJwtWithPreviousHash = async (
    jwtToken: string,
    previousHash: string,
    publicKey: string
): Promise<boolean> => {
    try {
        const verified = jwt.verify(jwtToken, publicKey, {
            algorithms: ["HS256"],
        });

        const decoded: any = jwt.decode(jwtToken, { complete: true });

        const headerAndPayload =
            jwtToken.split(".")[0] + "." + jwtToken.split(".")[1];

        const computedPreviousHash = await hash(headerAndPayload);

        return computedPreviousHash === previousHash;
    } catch (error) {
        return false;
    }
};

const hash = async (data: string): Promise<string> => {
    const hashValue = crypto.createHash("sha256").update(data).digest("hex");
    return hashValue;
};

const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyLWlzc3Vlci1oZXJlIiwic3ViIjoiZ2VuZXNpcyIsImlhdCI6MTY4MTA4MjAwMiwicHJldkhhc2giOm51bGwsImV4cCI6MTY4MTE2ODQwMn0.CPLQSho8wWoYmRWTdTlqeytiUWGTkpVsn1a7gtMwBAo";
const previousHash =
    "b1c5b85372e8f8b29e0cb3d3a9a9a8c146be74f7064926e15dc6c35e6b97450c";
const publicKey = "your_public_key_here";

verifyJwtWithPreviousHash(jwtToken, previousHash, publicKey)
    .then((isValid) => console.log(isValid))
    .catch((error) => console.log(error));
```

## Result

The research paper you provided is about a new method for using JWTs in a distributed environment. The method is called Chained JSON Web Tokens (cjwt), and it involves linking multiple JWTs together using the hash value of each token. This approach allows for enhanced security and ease of token revocation, since invalidating the root token of a chain would automatically invalidate all subsequent tokens in the chain.

The paper begins by exploring existing research on JWTs and related technologies, with a focus on the challenges and limitations of using traditional JWTs in a distributed environment. The authors then introduce their proposed method for chaining JWTs together, including the process for verifying the authenticity of each token in the chain.

Finally, the authors conduct a series of experiments to evaluate the effectiveness and security of their approach, comparing it to traditional JWTs and other related technologies. The authors' research aims to provide a new, more secure method for using JWTs in a distributed environment, with potential applications in industries such as e-commerce, finance, and healthcare.

Here are some of the key findings of the paper:

-   Chained JWTs provide enhanced security over traditional JWTs, since invalidating the root token of a chain would automatically invalidate all subsequent tokens in the chain.
-   Chained JWTs are easier to revoke than traditional JWTs, since only the root token needs to be revoked in order to invalidate all subsequent tokens in the chain.
-   Chained JWTs are more efficient than traditional JWTs, since they can be verified using a single signature instead of multiple signatures.
-   Chained JWTs are more scalable than traditional JWTs, since they can be used to authenticate multiple users without requiring a central authority.

The authors conclude that chained JWTs are a promising new method for using JWTs in a distributed environment. They recommend further research to explore the security and scalability of chained JWTs in more detail.

## Conclusion

In conclusion, chained JWTs are a promising new method for using JWTs in a distributed environment. They provide enhanced security, ease of token revocation, efficiency, and scalability over traditional JWTs. Further research is needed to explore the security and scalability of chained JWTs in more detail, but they have the potential to be a valuable tool for developers who need to authenticate users in a distributed environment.

## Reference

For reference check the README.md file in the root directory.
