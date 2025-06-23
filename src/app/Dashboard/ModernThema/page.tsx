"use client"; // Bu satırı ekleyin


import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAgencySettings } from '../../../hooks/useAgencySettings';
import { Tour, Testimonial } from '../../types';

interface ModernThemeProps {
  tours: Tour[];
  testimonials: Testimonial[];
}

export default function ModernTheme({ tours, testimonials }: ModernThemeProps) {
  const { settings, isLoading } = useAgencySettings();
  
  // Yükleme durumunda basit bir gösterici
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }
  
  // Tema renkleri ve stil değişkenleri
  const themeStyles = {
    '--primary-color': settings?.colors?.primary || '#2563eb',
    '--secondary-color': settings?.colors?.secondary || '#60a5fa',
    '--background-color': settings?.colors?.background || '#f8fafc',
    '--text-color': settings?.colors?.text || '#0f172a',
    '--accent-color': settings?.colors?.accent || '#e2e8f0',
  } as React.CSSProperties;
  
  return (
    <div style={themeStyles} className="modern-theme">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {settings?.logo ? (
              <Image 
                src={settings.logo} 
                alt={settings?.companyName || 'Tour Agency'} 
                width={40} 
                height={40} 
                className="object-contain"
              />
            ) : (
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
              >
                {settings?.companyName?.charAt(0) || 'D'}
              </div>
            )}
            <span 
              className="text-xl font-bold" 
              style={{ color: 'var(--primary-color)' }}
            >
              {settings?.companyName || 'DigiTour'}
            </span>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              <li>
                <Link 
                  href="/" 
                  className="font-medium hover:text-primary-600 transition-colors"
                  style={{ color: 'var(--text-color)' }}
                >
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link 
                  href="/tours" 
                  className="font-medium hover:text-primary-600 transition-colors"
                  style={{ color: 'var(--text-color)' }}
                >
                  Turlar
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="font-medium hover:text-primary-600 transition-colors"
                  style={{ color: 'var(--text-color)' }}
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="font-medium hover:text-primary-600 transition-colors"
                  style={{ color: 'var(--text-color)' }}
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </nav>
          
          <button 
            className="px-5 py-2 rounded-full text-white font-medium hidden md:block"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            Rezervasyon Yap
          </button>
          
          <button className="block md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative h-[600px] mt-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={settings?.heroImage || "/images/hero-default.jpg"}
            alt="Hero"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-3xl">
            {settings?.heroTitle || "Unutulmaz Seyahat Deneyimleri Keşfedin"}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            {settings?.heroSubtitle || "En iyi tur paketleri ve özel deneyimlerle hayalinizdeki tatili planlayın."}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button 
              className="px-6 py-3 rounded-full text-white font-medium transition-all hover:shadow-lg"
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              {settings?.primaryCTA || "Turları Keşfet"}
            </button>
            <button 
              className="px-6 py-3 rounded-full font-medium bg-white transition-all hover:shadow-lg"
              style={{ color: 'var(--primary-color)' }}
            >
              {settings?.secondaryCTA || "Bize Ulaşın"}
            </button>
          </div>
        </div>
      </section>
      
      {/* Featured Tours */}
      <section className="py-16" style={{ backgroundColor: 'var(--background-color)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--primary-color)' }}
            >
              {settings?.toursTitle || "Öne Çıkan Turlar"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings?.toursSubtitle || "En popüler ve beğeni toplayan tur paketlerimizi keşfedin."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.slice(0, 6).map((tour) => (
              <div key={tour.id} className="rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-all">
                <div className="relative h-[200px]">
                  <Image
                    src={tour.image || "/images/tour-default.jpg"}
                    alt={tour.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  {tour.featured && (
                    <div 
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      Öne Çıkan
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">{tour.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="font-medium">{tour.rating}</span>
                    <span className="text-gray-500 text-sm">({tour.reviewCount} değerlendirme)</span>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-2 mb-4">{tour.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span 
                        className="font-bold text-xl"
                        style={{ color: 'var(--primary-color)' }}
                      >
                        {tour.price.toLocaleString('tr-TR')}₺
                      </span>
                      <span className="text-gray-500 text-sm"> / kişi</span>
                    </div>
                    <Link 
                      href={`/tours/${tour.slug}`}
                      className="px-4 py-2 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                      Detaylar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {tours.length > 6 && (
            <div className="text-center mt-10">
              <Link 
                href="/tours"
                className="inline-block px-6 py-3 rounded-full text-white font-medium"
                style={{ backgroundColor: 'var(--primary-color)' }}
              >
                Tüm Turları Gör
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--primary-color)' }}
            >
              {settings?.featuresTitle || "Neden Bizi Tercih Etmelisiniz?"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings?.featuresSubtitle || "Profesyonel hizmet ve kaliteli deneyimler için doğru adres."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" style={{ color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Güvenli Rezervasyon</h3>
              <p className="text-gray-600">Güvenli ödeme altyapısı ve anında onaylanan rezervasyonlar.</p>
            </div>
            
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" style={{ color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Profesyonel Rehberlik</h3>
              <p className="text-gray-600">Uzman ve deneyimli rehberlerimizle keyifli tur deneyimi.</p>
            </div>
            
            <div className="text-center p-6">
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" style={{ color: 'var(--primary-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">En İyi Fiyat Garantisi</h3>
              <p className="text-gray-600">En iyi fiyat garantisi ve avantajlı paketler sunuyoruz.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16" style={{ backgroundColor: 'var(--accent-color)', opacity: 0.8 }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-bold mb-2"
              style={{ color: 'var(--primary-color)' }}
            >
              {settings?.testimonialTitle || "Müşteri Yorumları"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings?.testimonialSubtitle || "Katıldıkları turlardan sonra müşterilerimizin değerli düşünceleri."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill={i < testimonial.rating ? "#FBBF24" : "#E5E7EB"}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                
                <p className="mb-4 text-gray-700">"{testimonial.comment}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar || "/images/avatar-default.jpg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500">{testimonial.tourName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div 
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
          >
            <h2 className="text-3xl font-bold mb-4">Fırsatlardan Haberdar Olun</h2>
            <p className="mb-6 opacity-90">
              En yeni turlarımız ve özel indirimlerimiz hakkında bilgi almak için bültenimize abone olun.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email adresiniz"
                className="flex-grow px-4 py-3 rounded-full focus:outline-none"
              />
              <button 
                className="px-6 py-3 rounded-full font-medium"
                style={{ backgroundColor: 'white', color: 'var(--primary-color)' }}
              >
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                {settings?.logo ? (
                  <Image 
                    src={settings.logo} 
                    alt={settings?.companyName || 'Tour Agency'} 
                    width={40} 
                    height={40}
                    className="object-contain bg-white rounded-full p-1"
                  />
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    {settings?.companyName?.charAt(0) || 'D'}
                  </div>
                )}
                <span className="text-xl font-bold">{settings?.companyName || 'DigiTour'}</span>
              </Link>
              <p className="text-gray-400 mb-4">
                {settings?.footerTagline || 'Profesyonel tur ve seyahat hizmetleri.'}
              </p>
              <div className="flex gap-4">
                <a href={settings?.socialLinks?.facebook || '#'} className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href={settings?.socialLinks?.twitter || '#'} className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href={settings?.socialLinks?.instagram || '#'} className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Hızlı Bağlantılar</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Ana Sayfa</Link></li>
                <li><Link href="/tours" className="text-gray-400 hover:text-white">Turlar</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">Hakkımızda</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">İletişim</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Kategoriler</h3>
              <ul className="space-y-2">
                <li><Link href="/tours/category/cultural" className="text-gray-400 hover:text-white">Kültür Turları</Link></li>
                <li><Link href="/tours/category/beach" className="text-gray-400 hover:text-white">Plaj Tatilleri</Link></li>
                <li><Link href="/tours/category/adventure" className="text-gray-400 hover:text-white">Macera Turları</Link></li>
                <li><Link href="/tours/category/city-breaks" className="text-gray-400 hover:text-white">Şehir Turları</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">İletişim</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{settings?.contactInfo?.address || 'Atatürk Caddesi No:123, İstanbul'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{settings?.contactInfo?.phone || '+90 212 123 4567'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{settings?.contactInfo?.email || 'info@digitour.com'}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} {settings?.companyName || 'DigiTour'}. Tüm Hakları Saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}