export { default } from "next-auth/middleware";

//Add in pages that requires authentication
export const config = {
  matcher: ["/", "/alumni/:path*", "/announcements/:path*", "/users"],
};
