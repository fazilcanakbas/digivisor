import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const packageId = parseInt(params.id);
    
    if (isNaN(packageId)) {
      return NextResponse.json(
        { error: 'Geçersiz paket ID' },
        { status: 400 }
      );
    }
    
    const packageData = await prisma.package.findFirst({
      where: { packageId: packageId }
    });
    
    if (!packageData) {
      return NextResponse.json(
        { error: 'Paket bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(packageData);
  } catch (error) {
    console.error('Paket getirme hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}