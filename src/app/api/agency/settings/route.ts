import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Ayarları kaydet
export async function POST(request: NextRequest) {
  try {
    const settings = await request.json();
    
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
    
    // Agency ayarlarını güncelle
    const updatedAgency = await prisma.agency.update({
      where: { id: agency.id },
      data: {
        name: settings.companyName,
        logo: settings.logo,
        heroImage: settings.heroImage,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        primaryCTA: settings.primaryCTA,
        secondaryCTA: settings.secondaryCTA,
        toursTitle: settings.toursTitle,
        toursSubtitle: settings.toursSubtitle,
        featuresTitle: settings.featuresTitle,
        featuresSubtitle: settings.featuresSubtitle,
        testimonialTitle: settings.testimonialTitle,
        testimonialSubtitle: settings.testimonialSubtitle,
        footerTagline: settings.footerTagline,
        socialLinks: settings.socialLinks,
        contactInfo: settings.contactInfo,
        colors: settings.colors
      }
    });
    
    return NextResponse.json({ success: true, agency: updatedAgency });
    
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Mevcut ayarları getir
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
      companyName: agency.name,
      logo: agency.logo,
      colors: agency.colors,
      heroImage: agency.heroImage,
      heroTitle: agency.heroTitle,
      heroSubtitle: agency.heroSubtitle,
      primaryCTA: agency.primaryCTA,
      secondaryCTA: agency.secondaryCTA,
      toursTitle: agency.toursTitle,
      toursSubtitle: agency.toursSubtitle,
      featuresTitle: agency.featuresTitle,
      featuresSubtitle: agency.featuresSubtitle,
      testimonialTitle: agency.testimonialTitle,
      testimonialSubtitle: agency.testimonialSubtitle,
      footerTagline: agency.footerTagline,
      socialLinks: agency.socialLinks,
      contactInfo: agency.contactInfo
    });
    
  } catch (error) {
    console.error('Settings fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}