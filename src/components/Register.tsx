import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle } from "lucide-react";
import Loading from '@/components/Loading';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export function Register({ onSwitchToLogin }: RegisterProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false); // Manage loading state

  const validateInputs = () => {
    const errors: { [key: string]: string } = {};

    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      setIsVerificationStep(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    setIsLoading(true); // Start loading for verification

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Verification failed');
      }

      setSuccess(true);
      setTimeout(() => {
        onSwitchToLogin();
      }, 1500);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false); // Stop loading for verification
    }
  };

  const handleLoginRedirect = () => {
    onSwitchToLogin();
  };

  if (isLoading) {
    return <Loading />; // Show loading component during registration or verification
  }
  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg border border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-4xl font-semibold text-center text-gray-800 mb-2">Kayıt Ol</CardTitle>
        <CardDescription className="text-center text-gray-600">Yeni bir hesap oluşturun</CardDescription>
      </CardHeader>
      <CardContent>
        {!isVerificationStep ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              {validationErrors.username && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.username}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
              {validationErrors.password && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
              )}
            </div>
            {error && (
              <Alert variant="destructive" className="my-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full py-2 text-lg font-semibold text-white bg-amber-800 hover:bg-amber-950 rounded-md shadow-md transition duration-200 ease-in-out" disabled={success}>Kayıt Ol</Button>
          </form>
        ) : (
          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <div>
              <Label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">Doğrulama Kodu</Label>
              <Input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {error && (
              <Alert variant="destructive" className="my-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="bg-green-100 text-green-800 border-green-300 my-2">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Başarılı</AlertTitle>
                <AlertDescription>Email başarıyla doğrulandı! Giriş sayfasına yönlendiriliyorsunuz...</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full py-2 text-lg font-semibold text-white bg-amber-800 hover:bg-amber-950 rounded-md shadow-md transition duration-200 ease-in-out" disabled={success}>Doğrula</Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center text-gray-500">
          Zaten bir hesabınız var mı?{' '}
          <Button variant="link" onClick={handleLoginRedirect} className="p-0 text-blue-600 hover:underline">
            Buraya tıklayarak giriş yapın.
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}