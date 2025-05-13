import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorHandler';
import { LoginInput, RegisterInput } from '../types';

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password }: RegisterInput = req.body;

  if (!name || !email || !password) {
    return next(new AppError('Semua field harus diisi', 400));
  }
  
  if (password.length < 6) {
    return next(new AppError('Password minimal 6 karakter', 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError('Format email tidak valid', 400));
  }

  next();
};

export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: LoginInput = req.body;

  if (!email || !password) {
    return next(new AppError('Email dan password harus diisi', 400));
  }

  next();
};
