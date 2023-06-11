// Verify the jwt
import jwt from "jsonwebtoken";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ5b3VyLWlzc3Vlci1oZXJlIiwic3ViIjoiZ2VuZXNpcyIsImlhdCI6MTY4MTA4MjAwMiwicHJldkhhc2giOm51bGwsImV4cCI6MTY4MTE2ODQwMn0.CPLQSho8wWoYmRWTdTlqeytiUWGTkpVsn1a7gtMwBAo";

const secret = process.env.CJWT_SECRET as string;

try {
    const decoded = jwt.verify(token, secret);
    console.log(decoded);
} catch (err) {
    console.log(err);
}
