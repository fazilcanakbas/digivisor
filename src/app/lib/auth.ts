import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function verifyAuth(req: Request | NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return { success: false, error: 'Token bulunamadı' };
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, email: string };
    return { success: true, userId: decoded.userId, email: decoded.email };
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return { success: false, error: 'Geçersiz token' };
  }
}

export function createToken(userId: string, email: string) {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}