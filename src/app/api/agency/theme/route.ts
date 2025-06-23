import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Tema seçimini kaydet
export async function POST(request: NextRequest) {
  try {
    const { themeId, colors } = await request.json();
    
    // JWT'den user ID'sini al (authentication gerekli)
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    // Kullanıcının agency'sini bul ve tema ayarlarını güncelle
    const agency = await prisma.agency.findUnique({
      where: { userId: decoded.userId }
    });
    
    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }
    
    // Tema ayarlarını güncelle
    const updatedAgency = await prisma.agency.update({
      where: { id: agency.id },
      data: {
        themeId,
        colors: colors || null
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      agency: updatedAgency 
    });
    
  } catch (error) {
    console.error('Theme update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Mevcut tema ayarlarını getir
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    
    const agency = await prisma.agency.findUnique({
      where: { userId: decoded.userId }
    });
    
    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      themeId: agency.themeId,
      colors: agency.colors
    });
    
  } catch (error) {
    console.error('Theme fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}