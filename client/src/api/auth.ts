import api from './axiosInstance';
import { Profile } from '../Context/AuthContext';

// Login user and return token + user profile
export async function login(email: string, password: string) {
  try {
    const res = await api.post('/auth/login', { email, password });
    const { accessToken, user } = res.data;
    localStorage.setItem('accessToken', accessToken);
    return { token: accessToken, user };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed');
  }
}

// Register a new user and return token + user profile
export async function register(
  name: string,
  email: string,
  password: string
) {
  try {
    const res = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    const { accessToken, user } = res.data;
    localStorage.setItem('accessToken', accessToken);
    return { token: accessToken, user };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed');
  }
}

// Refresh access token using refresh token (if implemented)
export async function refreshToken() {
  try {
    const res = await api.post('/auth/refresh');
    const { accessToken } = res.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw new Error('Session expired');
  }
}

// Logout user and clear token
export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
  }
}

// Fetch authenticated user's profile
export async function getProfile(): Promise<Profile> {
  try {
    const res = await api.get('/auth/profile');
    return res.data;
  } catch (error) {
    console.error('Fetching profile failed:', error);
    throw new Error('Unable to fetch profile');
  }
}

// Update authenticated user's profile
export async function updateProfile(profile: Profile): Promise<Profile> {
  try {
    const res = await api.put('/auth/profile', profile);
    return res.data;
  } catch (error) {
    console.error('Updating profile failed:', error);
    throw new Error('Unable to update profile');
  }
}
