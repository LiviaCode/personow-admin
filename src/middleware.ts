import { jwtDecode } from "jwt-decode";
import { type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/entrar-personal", whenAuthenticated: "redirect" },
  { path: "/entrar-aluno", whenAuthenticated: "redirect" },
  { path: "/registrar", whenAuthenticated: "redirect" },
  { path: "/registrar-personal", whenAuthenticated: "redirect" },
  { path: "/registrar-aluno", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
] as const;

const DEFAULT_AUTHENTICATED_REDIRECT = "/";

function redirectTo(path: string, request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = path;
  return NextResponse.redirect(redirectUrl);
}

function isTokenExpired(exp?: number): boolean {
  return !!exp && exp < Date.now() / 1000;
}

function getRedirectPathWhenNotAuthenticated(pathname: string): string {
  if (pathname.startsWith("/admin")) return "/entrar-personal";
  if (pathname.startsWith("/alunos")) return "/entrar-aluno";
  return "/entrar";
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);
  const authToken = request.cookies.get("token")?.value;

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectPath = getRedirectPathWhenNotAuthenticated(path);
    return redirectTo(redirectPath, request);
  }

  if (authToken && publicRoute?.whenAuthenticated === "redirect") {
    return redirectTo(DEFAULT_AUTHENTICATED_REDIRECT, request);
  }

  if (authToken && !publicRoute) {
    try {
      const decoded = jwtDecode(authToken);
      if (isTokenExpired(decoded.exp)) {
        const redirectPath = getRedirectPathWhenNotAuthenticated(path);
        return redirectTo(redirectPath, request);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const redirectPath = getRedirectPathWhenNotAuthenticated(path);
      return redirectTo(redirectPath, request);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
