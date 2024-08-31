import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NextResponse, NextRequest } from 'next/server';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: React.ReactNode;
  path: string;
};


const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children, path }) => {
  const pathName = usePathname();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    if (!isAuthenticated && pathName === `${url}${path}`) {
      router.push('/login');
    }
  }, [isAuthenticated, pathName, path, url, router]);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export const config = {
  matcher: ['/protected-route'], 
};

export default ProtectedRoute;