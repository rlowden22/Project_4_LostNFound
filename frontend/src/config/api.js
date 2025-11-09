const isBrowser = typeof window !== "undefined";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV
    ? ""
    : isBrowser
      ? window.location.origin
      : "");

export { API_BASE_URL };

