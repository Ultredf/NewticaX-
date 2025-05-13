import { Response, NextFunction } from 'express';
import { prisma } from '../config/db';
import { AppError } from '../utils/errorHandler';
import { verifyToken } from '../utils/jwt';
import { AuthRequest } from '../types';

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return next(new AppError('Tidak terautentikasi. Silakan login terlebih dahulu', 401));
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return next(new AppError('Token tidak valid atau kadaluarsa', 401));
    }

    // Get user from token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return next(new AppError('User tidak ditemukan', 404));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    next(new AppError('Tidak terautentikasi', 401));
  }
};
