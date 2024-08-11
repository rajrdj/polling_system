export const reactStrictMode = true;
export const distDir = 'build';
export function webpack(config, { isServer }) {
    if (!isServer) {
        config.resolve.fallback = { fs: false, path: false };
    }
    return config;
}