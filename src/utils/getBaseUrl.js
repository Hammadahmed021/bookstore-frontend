export const BASE_URL = () => {
    // Access the mode and environment variables
    const mode = import.meta.env.MODE; // Gets the current mode (development or production)
    const env = import.meta.env; // Accesses Vite's environment variables
  
    // Determine the base URL based on the mode
    const baseURL =
      mode === "production"
        ? env.VITE_BASE_URL_PRODUCTION
        : env.VITE_BASE_URL_LOCAL || "/";
  
    return baseURL;
  };
  