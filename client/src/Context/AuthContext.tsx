import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import api from "../api/axiosInstance"; // your axios instance with interceptor

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
  login: (token: string, profile: Profile) => void;
  logout: () => void;
  updateProfile: (profile: Profile) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for token and validate user
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    // Optionally call backend to get user profile and validate token
    api
      .get("/profile") // protected endpoint returning user profile
      .then((res) => {
        setUserProfile(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserProfile(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = (token: string, profile: Profile) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    setUserProfile(profile);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  const updateProfile = (updatedProfile: Profile) => {
    setUserProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userProfile,
        login,
        logout,
        updateProfile,
        loading,
      }}
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
