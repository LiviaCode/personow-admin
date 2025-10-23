import { type CookiesFn, getCookie } from "cookies-next";
import ky from "ky";

// Instância para personal
export const apiPersonal = ky.create({
  prefixUrl: "http://54.233.47.191/personal/",
});

export const api = ky.create({
  prefixUrl: "http://54.233.47.191/",
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
