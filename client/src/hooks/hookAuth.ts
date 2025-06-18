import { useAuth } from '../Context/AuthContext';

export function useAuthUser() {
  const {
    isAuthenticated,
    loading,
    login,
    logout,
    
  } = useAuth();

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  };
}
