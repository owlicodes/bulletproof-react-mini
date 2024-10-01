import { delay } from "msw";

import { db } from "./db";

export const encode = (obj: any) => {
  const btoa =
    typeof window === "undefined"
      ? (str: string) => Buffer.from(str, "binary").toString("base64")
      : window.btoa;
  return btoa(JSON.stringify(obj));
};

export const decode = (str: string) => {
  const atob =
    typeof window === "undefined"
      ? (str: string) => Buffer.from(str, "base64").toString("binary")
      : window.atob;
  return JSON.parse(atob(str));
};

export const networkDelay = () => {
  const delayTime = import.meta.env.TEST
    ? 200
    : Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};

export const hash = (str: string) => {
  let hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return String(hash >>> 0);
};

const omit = <T extends object>(obj: T, keys: string[]): T => {
  const result = {} as T;
  for (const key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

export const sanitizeUser = <O extends object>(user: O) =>
  omit<O>(user, ["password", "iat"]);

export function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user);
    const encodedToken = encode(sanitizedUser);
    return {
      user: sanitizedUser,
      tokens: {
        accessToken: encodedToken,
        refreshToken: encodedToken,
      },
    };
  }

  const error = new Error("Invalid username or password");
  throw error;
}
