export const getBaseURL = () => {
    const mode = import.meta.env.MODE; // Use MODE provided by Vite
    return mode === 'production'
      ? import.meta.env.VITE_BASE_URL_PRODUCTION
      : import.meta.env.VITE_BASE_URL_LOCAL || '/';
  };
  