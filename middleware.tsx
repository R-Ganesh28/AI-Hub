import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/chatbot(.*)",
  "/imageGen(.*)",
  "/shortVideoGen(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.pathname;

  const isImagePublic = url.startsWith("/imageGen/image/");

  if (isProtectedRoute(req) && !isImagePublic) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
