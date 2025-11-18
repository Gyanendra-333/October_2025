export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",   // protected routes
        "/profile/:path*",     // protected routes
        "/admin/:path*",       // protected routes
    ],
};
