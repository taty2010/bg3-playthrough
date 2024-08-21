import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoute = createRouteMatcher(["/", "/login(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (!publicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
