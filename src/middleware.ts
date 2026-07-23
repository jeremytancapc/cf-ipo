import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Domain-based access control.
 * Only allows traffic from the configured allowed host.
 * All Vercel default domains (*.vercel.app / *.vercel.sh) are blocked.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // The only domain allowed to serve this site
  const allowedHost = process.env.ALLOWED_HOST ?? "ipo-stg.crawfort.com";

  // Allow localhost for local development
  const isLocalhost = host.startsWith("localhost") || host.startsWith("127.0.0.1");

  // Block any request NOT coming from the allowed host (except localhost)
  if (!isLocalhost && host !== allowedHost) {
    return new NextResponse(
      "<html><body><h1>Access Restricted</h1><p>This site is not available at this address.</p></body></html>",
      {
        status: 403,
        headers: { "content-type": "text/html" },
      }
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except static files and Next.js internals
  matcher: ["/((?!_next/static|_next/image|favicon.svg).*)"],
};
