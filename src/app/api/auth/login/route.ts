import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Kullanıcıyı bul
    const user = await prisma.user.findUnique({
      where: { email },
      include: { agency: true }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      );
    }
    
    // Şifreyi kontrol et
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      );
    }
    
    // Token oluştur
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Kullanıcı bilgilerini döndür (şifre hariç)
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      agencyName: user.agencyName,
      packageId: user.packageId,
      agency: user.agency
    };
    
    return NextResponse.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}