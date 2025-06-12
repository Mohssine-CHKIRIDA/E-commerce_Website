import { useState, useEffect } from "react";
import api from "../api/axiosInstance";
import { Profile } from "../Context/AuthContext";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get<Profile>("/profile")
      .then((res) => {
        setProfile(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to fetch profile");
      })
      .finally(() => setLoading(false));
  }, []);

  async function updateProfile(updatedProfile: Partial<Profile>) {
    try {
      setLoading(true);
      const res = await api.put<Profile>("/auth/profile", updatedProfile);
      setProfile(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError("Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { profile, loading, error, updateProfile };
}
