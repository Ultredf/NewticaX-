import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
  redirectAuthenticatedTo?: string;
}

export const useAuth = (options: UseAuthOptions = {}) => {
  const {
    requireAuth = false,
    redirectTo = '/login',
    redirectIfAuthenticated = false,
    redirectAuthenticatedTo = '/dashboard',
  } = options;

  const { isAuthenticated, user, isLoading, getMe } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Fetch user data on initial load if cookie exists
    if (!isAuthenticated && !isLoading) {
      getMe();
    }
  }, [getMe, isAuthenticated, isLoading]);

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;

    // Redirect if authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    // Redirect if user is authenticated and should be redirected
    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(redirectAuthenticatedTo);
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    requireAuth,
    redirectIfAuthenticated,
    redirectTo,
    redirectAuthenticatedTo,
    router,
    pathname,
  ]);

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};
