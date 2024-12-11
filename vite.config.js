import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Export the configuration
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: '/', // Use '/' as the base for Vercel deployment
    build: {
      minify: true,
      sourcemap: false,
      target: 'modules',
    },
  };
});
