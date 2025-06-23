import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

export async function POST(request: Request) {
  try {
    const { email, password, agencyName, packageId } = await request.json();
    
    // Email kontrolü
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }
    
    // Şifre hashleme
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Subdomain oluşturma
    const subdomain = agencyName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    // Kullanıcıyı oluştur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        agencyName,
        packageId: Number(packageId),
        agency: {
          create: {
            name: agencyName,
            packageId: Number(packageId),
            subdomain,
          }
        }
      },
      include: {
        agency: true
      }
    });
    
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
      message: 'Kullanıcı başarıyla kaydedildi',
      token,
      user: userWithoutPassword
    }, { status: 201 });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası, lütfen tekrar deneyin' },
      { status: 500 }
    );
  }
}