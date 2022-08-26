/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,   
          issuer: { and: [/\.(js|ts|md)x?$/] }, 
          use: [{loader: '@svgr/webpack', options: {icon: true}}],
        });
    
        return config;
      },
}

module.exports = nextConfig
