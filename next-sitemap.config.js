module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOST_URL || "https://ezyshopv.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/profile", "/checkout", "/success/*", "/orders/*"],
};
