/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  env: {
    WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
    BASE_URL: process.env.BASE_URL,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

module.exports = nextConfig
