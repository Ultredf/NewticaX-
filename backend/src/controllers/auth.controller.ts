import { Request, Response, NextFunction } from 'express';
import { register, login, getUserById } from '../services/auth.service';
import { generateToken } from '../utils/jwt';
import { env } from '../config/env';
import { AuthRequest } from '../types';

export const registerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    
    // Register new user
    const user = await register({ name, email, password });

    // Generate JWT token
    const token = generateToken(user.id);

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: env.COOKIE_EXPIRES,
      sameSite: 'strict',
    });

    // Return response without password
    const { password: _, ...userData } = user;
    
    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const loginHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    
    // Login user
    const user = await login({ email, password });

    // Generate JWT token
    const token = generateToken(user.id);

    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: env.COOKIE_EXPIRES,
      sameSite: 'strict',
    });

    // Return response without password
    const { password: _, ...userData } = user;
    
    res.status(200).json({
      success: true,
      message: 'Login berhasil',
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const getMeHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new Error('User tidak ada');
    }

    // Return user data without password
    const { password, ...userData } = req.user;
    
    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Clear cookie
    res.clearCookie('token');
    
    res.status(200).json({
      success: true,
      message: 'Logout berhasil',
    });
  } catch (error) {
    next(error);
  }
};
