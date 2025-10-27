import { useEffect, useState } from "react";
import AuthContext from "../hooks/AuthContext.js";
import api from "../api/api.js";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let refreshPromise = null;
    const controller = new AbortController();
    const signal = controller.signal;

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        // Don't try to refresh if the failing request was the refresh endpoint itself
        if (originalRequest.url && originalRequest.url.includes('/auth/token/refresh')) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = api
                .post("/auth/token/refresh", {}, { withCredentials: true })
                .then((res) => {
                  refreshPromise = null;
                  return res;
                })
                .catch((err) => {
                  refreshPromise = null;
                  throw err;
                });
            }

            await refreshPromise;
            return api(originalRequest);
          } catch (refreshError) {
            setIsAuthenticated(false);
            setUser(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    const verifyAuth = async () => {
      try {
        const response = await api.get("/auth/me", { signal });
        setIsAuthenticated(true);
        setUser(response.data);
      } catch {
        if (!signal.aborted) {
          setIsAuthenticated(false);
          setUser(null);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    verifyAuth();

    return () => {
      controller.abort();
      api.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const login = async (credentials) => {
    await api.post("/auth/login", credentials, { withCredentials: true });
    setIsAuthenticated(true);
    const response = await api.get("/auth/me", { withCredentials: true });
    setUser(response.data);
  };

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
