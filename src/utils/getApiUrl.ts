export const getApiUrl = () => {
  if (import.meta.env.VITE_ENVIRONTMENT === "development") {
    return import.meta.env.VITE_DEV_SERVER_URL;
  }
  return import.meta.env.VITE_DEV_SERVER_URL;
};
