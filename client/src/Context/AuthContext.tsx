import { createContext, useContext, useState, ReactNode } from "react";

export interface Profile {
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userProfile: Profile | null;
  login: (profile: Profile) => void;
  logout: () => void;
  updateProfile: (profile: Profile) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  const login = (profile: Profile) => {
    setIsAuthenticated(true);
    setUserProfile(profile);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };
  const updateProfile = (updatedProfile: Profile) => {
    setUserProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userProfile, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
