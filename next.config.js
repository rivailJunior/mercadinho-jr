/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  env: {
    WELCOME_MESSAGE: process.env.WELCOME_MESSAGE,
  },
};

module.exports = nextConfig
