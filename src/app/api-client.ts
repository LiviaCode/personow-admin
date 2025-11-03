import { type CookiesFn, getCookie } from "cookies-next";
import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://34.39.211.212:3018",
  // credentials: "include",

  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined;

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");
          cookieStore = serverCookies;
        }

        const token = await getCookie("token", { cookies: cookieStore });

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
