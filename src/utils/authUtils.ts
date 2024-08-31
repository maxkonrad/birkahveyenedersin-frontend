import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';

interface JwtPayload {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

const TOKEN_KEY = 'authToken';

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Invalid token:', error);
    return false;
  }
};

export const saveToken = (token: string) => {
  setCookie(TOKEN_KEY, token, { expires: 7 }); // Token expires in 7 days
};

export const getToken = (): string | undefined => {
  return getCookie(TOKEN_KEY);
};

export const removeToken = () => {
  removeCookie(TOKEN_KEY);
};
