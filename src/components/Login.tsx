import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Loading from "@/components/Loading";
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';


interface LoginProps {
  onLogin: (token: string) => void;
  onSwitchToRegister: () => void;
}

export function Login({ onLogin, onSwitchToRegister }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true); // Set loading to true when starting login
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      setCookie('username', username, { expires: 7 }); 
      onLogin(data.accessToken);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading after the request is completed
    }
  };

  const handleRegisterRedirect = () => {
    onSwitchToRegister();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-4xl font-semibold text-center text-gray-800 mb-2">
          Giriş Yap
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Hoşgeldin! Lütfen hesabına giriş yap.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Kullanıcı Adın
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className="font-medium">Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full p-3 text-lg font-semibold text-white bg-amber-800 hover:bg-amber-950 rounded-md shadow-md transition duration-200 ease-in-out">
            Giriş Yap
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-gray-500">
          Hesabın yok mu?{" "}
          <Button
            variant="link"
            onClick={handleRegisterRedirect}
            className="p-0 text-blue-600 hover:underline"
          >
            Buradan üye olabilirsin.
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}