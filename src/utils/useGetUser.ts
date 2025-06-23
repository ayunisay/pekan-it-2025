import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { verifyToken } from "../providers/userProvider";
import type { UserInterface as User } from "../interface/Interface";

type UseGetUserReturn = {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  logout: (redirectToLogin?: boolean) => void;
}

type ApiError = {
  message: string;
  status?: number;
}

let userCache: User | null = null;
let lastFetchTime: number | null = null;
let isCurrentlyFetching: boolean = false;

const CACHE_TIME: number = 10 * 60 * 1000; // 10 menit
//Bakal fetch setiap 10 menit sekali

const useGetUser = (): UseGetUserReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(userCache);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (): Promise<void> => {
    const token: string | undefined = Cookies.get('token');
    
    if (!token) {
      userCache = null;
      lastFetchTime = null;
      setUser(null);
      return;
    }

    const now: number = Date.now();
    const cacheIsValid: boolean = Boolean(
      userCache && 
      lastFetchTime && 
      (now - lastFetchTime) < CACHE_TIME
    );
    
    if (cacheIsValid) {
      setUser(userCache);
      return;
    }

    if (isCurrentlyFetching) {
      return;
    }

    try {
      isCurrentlyFetching = true;
      setLoading(true);
      setError(null);

      const userData: User = await verifyToken({token});
      
      userCache = userData;
      lastFetchTime = now;
      setUser(userData);

    } catch (e: unknown) {
      const apiError = e as ApiError;
      setError(apiError.message || 'Ada yang error');
      setUser(null);
      
      if (apiError.status === 401 || apiError.status === 403) {
        logout(true);
      }
    } finally {
      setLoading(false);
      isCurrentlyFetching = false;
    }
  };

  const refetch = (): void => {
    userCache = null;
    lastFetchTime = null;
    fetchUser();
  };

  const logout = (redirectToLogin: boolean = true): void => {
    Cookies.remove('token');
    
    userCache = null;
    lastFetchTime = null;
    setUser(null);
    setError(null);
    
    if (redirectToLogin && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { 
    user, 
    loading, 
    error, 
    refetch, 
    logout 
  };
};

export default useGetUser;