module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_HOST_URL || "http://ezyshop-sandy-eight.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/profile", "/checkout", "/success/*", "/orders/*"],
};
