// verify jwt, accounting for the previoys hash
import * as jwt from "jsonwebtoken";

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

// The function hash computes the hash of the header and payload,
// which is then compared to the previous hash passed in as a parameter.
// If they match, the function returns true, otherwise it returns false.
const hash = async (data: string): Promise<string> => {
    // compute hash of the data here
    return "";
};

// example usage
const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyLWlzc3Vlci1oZXJlIiwic3ViIjoiZ2VuZXNpcyIsImlhdCI6MTY4MTA4MjAwMiwicHJldkhhc2giOm51bGwsImV4cCI6MTY4MTE2ODQwMn0.CPLQSho8wWoYmRWTdTlqeytiUWGTkpVsn1a7gtMwBAo";
const previousHash =
    "b1c5b85372e8f8b29e0cb3d3a9a9a8c146be74f7064926e15dc6c35e6b97450c";
const publicKey = "your_public_key_here";

// true or false
verifyJwtWithPreviousHash(jwtToken, previousHash, publicKey)
    .then((isValid) => console.log(isValid))
    .catch((error) => console.log(error));
