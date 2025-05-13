export const env = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'default-jwt-secret',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'default-cookie-secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  COOKIE_EXPIRES: 7 * 24 * 60 * 60 * 1000, // 7 days
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
