//https://github.com/vercel/next.js/discussions/38227
//https://stackoverflow.com/questions/71851464/nextjs-build-failing-because-of-jsonwebtoken-in-middleware-ts
//https://stackoverflow.com/questions/72826125/verify-jwt-token-in-next-js-middleware-throws-module-not-found-cant-resolve-c

import { SignJWT, jwtVerify } from "jose";

export async function sign(payload, secret) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600; // one hour

  return new SignJWT({ payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
}

export async function verify(token, secret) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  //return true;
  return payload;
}
