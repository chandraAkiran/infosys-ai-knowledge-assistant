"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
  role: string;
  department: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  name: "Pulkit Narang",
  email: "employee@infosys.com",
  role: "Employee",
  department: "Engineering",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("enterprise_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(email: string, password: string) {
    if (
      email === "employee@infosys.com" &&
      password === "password123"
    ) {
      setUser(DEMO_USER);
      localStorage.setItem(
        "enterprise_user",
        JSON.stringify(DEMO_USER)
      );

      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("enterprise_user");
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