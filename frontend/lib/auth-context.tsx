"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { apiRequest } from "./api";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department: string;
  is_active: boolean;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  email: string;
  role: string;
}

interface CurrentUserResponse {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department: string;
  is_active: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("enterprise_token");

    if (!token) {
      return;
    }

    async function restoreSession() {
      try {
        const currentUser =
          await apiRequest<CurrentUserResponse>("/users/me", {
            token,
          });

        const restoredUser: User = {
          id: currentUser.id,
          email: currentUser.email,
          full_name: currentUser.full_name,
          role: currentUser.role,
          department: currentUser.department,
          is_active: currentUser.is_active,
        };

        setUser(restoredUser);

        localStorage.setItem(
          "enterprise_user",
          JSON.stringify(restoredUser)
        );
      } catch {
        localStorage.removeItem("enterprise_token");
        localStorage.removeItem("enterprise_user");
        setUser(null);
      }
    }

    restoreSession();
  }, []);

  async function login(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const response = await apiRequest<LoginResponse>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      localStorage.setItem(
        "enterprise_token",
        response.access_token
      );

      const currentUser =
        await apiRequest<CurrentUserResponse>("/users/me", {
          token: response.access_token,
        });

      const loggedInUser: User = {
        id: currentUser.id,
        email: currentUser.email,
        full_name: currentUser.full_name,
        role: currentUser.role,
        department: currentUser.department,
        is_active: currentUser.is_active,
      };

      setUser(loggedInUser);

      localStorage.setItem(
        "enterprise_user",
        JSON.stringify(loggedInUser)
      );

      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("enterprise_token");
    localStorage.removeItem("enterprise_user");

    window.location.href = "/login";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
