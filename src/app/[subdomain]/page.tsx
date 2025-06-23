import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import ThemeRenderer from '../components/themes/ThemeRenderer';

const prisma = new PrismaClient();

interface AgencyPageProps {
  params: {
    subdomain: string;
  };
}

async function getAgencyBySubdomain(subdomain: string) {
  try {
    const agency = await prisma.agency.findUnique({
      where: { subdomain },
      include: {
        user: true
      }
    });
    
    return agency;
  } catch (error) {
    console.error('Agency fetch error:', error);
    return null;
  }
}

async function getTours(agencyId: string) {
  try {
    const tours = await prisma.tour.findMany({
      where: { agencyId },
      take: 6,
      orderBy: { createdAt: 'desc' }
    });
    
    return tours;
  } catch (error) {
    console.error('Tours fetch error:', error);
    return [];
  }
}

async function getTestimonials(agencyId: string) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { agencyId },
      take: 3,
      orderBy: { createdAt: 'desc' }
    });
    
    return testimonials;
  } catch (error) {
    console.error('Testimonials fetch error:', error);
    return [];
  }
}

export default async function AgencyPage({ params }: AgencyPageProps) {
  const { subdomain } = params;
  
  const agency = await getAgencyBySubdomain(subdomain);
  
  if (!agency) {
    notFound();
  }
  
  const tours = await getTours(agency.id);
  const testimonials = await getTestimonials(agency.id);
  
  return (
    <div>
      <ThemeRenderer 
        themeId={agency.themeId || 1}
        tours={tours}
        testimonials={testimonials}
      />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { subdomain: string } }) {
  const agency = await getAgencyBySubdomain(params.subdomain);
  
  if (!agency) {
    return {
      title: 'Sayfa Bulunamadı',
    };
  }
  
  return {
    title: `${agency.name} - Tur ve Seyahat`,
    description: agency.heroSubtitle || `${agency.name} ile unutulmaz seyahat deneyimleri`,
  };
}