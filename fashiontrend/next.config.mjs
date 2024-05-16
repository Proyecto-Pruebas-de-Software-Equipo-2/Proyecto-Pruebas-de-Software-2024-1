import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    const rootDir = process.cwd(); // Get the root directory

    // Add custom webpack configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lib': path.resolve(rootDir, 'lib'), // Adjust the path as needed
      '@models': path.resolve(rootDir, 'models'), // Adjust the path as needed
    };

    return config;
  },
};

export default nextConfig;


