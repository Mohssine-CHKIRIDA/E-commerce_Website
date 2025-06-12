import { useAuth } from '../Context/AuthContext';

export function useAuthUser() {
  const {
    userProfile,
    isAuthenticated,
    loading,
    login,
    logout,
    updateProfile,
  } = useAuth();

  return {
    user: userProfile,
    isAuthenticated,
    loading,
    login,
    logout,
    updateProfile,
  };
}
