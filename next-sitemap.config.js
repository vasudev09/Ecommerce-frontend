module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  exclude: ["/profile", "/checkout", "/success/*", "/orders/*"],
};
