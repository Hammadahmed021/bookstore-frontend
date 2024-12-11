import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Define a utility function to get the base URL
const getBaseURL = (mode) => {
  const env = loadEnv(mode, process.cwd());
  return mode === 'production' ? env.VITE_BASE_URL_PRODUCTION : env.VITE_BASE_URL_LOCAL || '/';
};

// Export the configuration
export default defineConfig(({ mode }) => {
  const baseURL = getBaseURL(mode);

  return {
    plugins: [react()],
    base: baseURL,
    // build: {
    //   minify: true,
    //   sourcemap: false,
    //   target: 'modules',
    // },
  };
});
