import crypto from "crypto";

function generateSalt(length: number) {
  return crypto.randomBytes(length).toString("hex");
}

function hashPassword(password: string) {
  const salt = generateSalt(10);
  const hash = crypto.createHmac("sha512", salt).update(password).digest("hex");
  return { hash: hash, salt: salt };
}

function comparePassword(hash: string, password: string, salt: string) {
  const hashFromDB = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("hex");
  return hash === hashFromDB;
}

export { comparePassword, hashPassword };
