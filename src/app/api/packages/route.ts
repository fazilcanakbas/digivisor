import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: {
        packageId: 'asc'
      }
    });
    
    // Burada packages dizisinin her bir elemanında id (MongoDB ObjectId) 
    // ve packageId (sıra numarası) var
    // Linklerde packageId değerini kullanmalıyız
    
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Paketleri getirme hatası:', error);
    return NextResponse.json(
      { error: 'Paketleri getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
}