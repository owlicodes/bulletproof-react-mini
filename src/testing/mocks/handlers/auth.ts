import { HttpResponse, http } from "msw";

import { env } from "@/config/env";
import { db, persistDb } from "../db";
import { authenticate, hash, networkDelay } from "../utils";

type RegisterBody = {
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  http.post(`${env.API_URL}/v1/auth/register`, async ({ request }) => {
    await networkDelay();
    try {
      const userObject = (await request.json()) as RegisterBody;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        return HttpResponse.json(
          { message: "The user already exists" },
          { status: 400 },
        );
      }

      db.user.create({
        ...userObject,
        password: hash(userObject.password),
      });

      await persistDb("user");

      const result = authenticate({
        email: userObject.email,
        password: userObject.password,
      });

      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500 },
      );
    }
  }),

  http.post(`${env.API_URL}/v1/auth/login`, async ({ request }) => {
    await networkDelay();

    try {
      const credentials = (await request.json()) as LoginBody;
      const result = authenticate(credentials);

      return HttpResponse.json(result);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500 },
      );
    }
  }),

  http.get(`${env.API_URL}/v1/users/me`, async () => {
    await networkDelay();

    try {
      return HttpResponse.json(null);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || "Server Error" },
        { status: 500 },
      );
    }
  }),
];
