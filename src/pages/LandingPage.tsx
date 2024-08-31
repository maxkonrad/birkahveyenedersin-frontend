import React, { useEffect, useState } from "react";
import Head from "next/head";
import CoffeeInvite from "../components/CoffeeInvite";
import ProtectedRoute from "../components/ProtectedRoute";
import { Register } from "../components/Register";
import { Login } from "../components/Login";
import {
  isTokenValid,
  saveToken,
  getToken,
  removeToken,
} from "../utils/authUtils";
import Loading from "../components/Loading";
import Landing from "../components/Landing";
import { usePathname } from "next/navigation"; // Updated import for pathname
import { useRouter } from "next/navigation"; // New import for the router

const LandingPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      removeToken();
      setIsAuthenticated(false);
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (pathname === "/coffee-invite") {
    return (
      <ProtectedRoute path="/coffee-invite" isAuthenticated={isAuthenticated}>
        <CoffeeInvite />
      </ProtectedRoute>
    );
  }
  if (pathname === "/register") {
    if (isAuthenticated) {
      router.push("/coffee-invite");
    }
    return <Register onSwitchToLogin={() => router.push("/login")} />;
  }

  if (pathname === "/login") {
    if (isAuthenticated) {
      router.push("/coffee-invite");
    }
    return (
      <Login
        onLogin={(token: string) => {
          saveToken(token);
          setIsAuthenticated(true);
          router.push("/coffee-invite");
        }}
        onSwitchToRegister={() => router.push("/register")}
      />
    );
  }

  return (
    <div>
      <Landing />
    </div>
  );
};
export default LandingPage;
