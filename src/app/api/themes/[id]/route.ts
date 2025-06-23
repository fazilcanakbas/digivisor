import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const themeId = parseInt(params.id);
    
    if (isNaN(themeId)) {
      return NextResponse.json(
        { error: 'Geçersiz tema ID' },
        { status: 400 }
      );
    }
    
    const theme = await prisma.theme.findFirst({
      where: { themeId: themeId }
    });
    
    if (!theme) {
      return NextResponse.json(
        { error: 'Tema bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(theme);
  } catch (error) {
    console.error('Tema getirme hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}