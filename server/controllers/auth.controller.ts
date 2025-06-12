import { Request, Response } from 'express';
import {  getUserProfile, loginUser, refreshAccessToken, registerUser, updateUserProfile } from '../services/auth.service';



export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const tokens = await loginUser(email, password);
    if (!tokens) { res.status(401).json({ error: 'Invalid email or password' });     return;
}

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: tokens.accessToken });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
export const register = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  try {
    const tokens = await registerUser({ name, email, password, phone });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken: tokens.accessToken });
  } catch (err: any) {
    if (err.message === 'EMAIL_EXISTS') {
      res.status(400).json({ error: 'Email already in use' });
    } else {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const getProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    const user = await getUserProfile(req.user.id);
    if (!user) { res.status(404).json({ error: 'User not found' });}

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const refresh = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) { 
    res.status(401).json({ error: 'Unauthorized' });
    return;
}

  try {
    const newAccessToken = refreshAccessToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};
export const updateProfile = async (req: Request & { user?: any }, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
     res.status(401).json({ error: 'Unauthorized' });
     return;
  }

  const { name, phone, birthdate, gender } = req.body;

  try {
    const updatedUser = await updateUserProfile(userId, { name, phone, birthdate, gender });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
