export const BASE_URL = (() => {
  const mode = import.meta.env.VITE_MODE; // Get the current mode

  return mode === 'production' ? import.meta.env.VITE_BASE_URL_PRODUCTION : import.meta.env.VITE_BASE_URL_LOCAL || '/';
})();
