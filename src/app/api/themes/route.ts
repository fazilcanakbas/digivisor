import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const themes = await prisma.theme.findMany({
      orderBy: {
        themeId: 'asc'
      }
    });
    return NextResponse.json(themes);
  } catch (error) {
    console.error('Tema getirme hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}