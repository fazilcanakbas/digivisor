'use client';

import { useEffect, useState } from 'react';
import { Check, Star, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from './lib/AuthContext';

interface Package {
  id: number;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
}

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Eğer kullanıcı girişi yapılmışsa CRM'e yönlendir
    if (user) {
      router.push('/crm');
    }
    
    // Paketleri getir
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
          throw new Error('Paketler getirilemedi');
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Paket getirme hatası:', error);
        // Mock data ile devam et
        setPackages([
          {
            id: 1,
            name: 'Başlangıç',
            price: 299,
            features: [
              '1 Tema Seçeneği',
              '500 API Çağrısı/Ay',
              'Temel CRM',
              'Email Desteği',
              'Subdomain (.turplatform.com)'
            ],
            popular: false
          },
          {
            id: 2,
            name: 'Profesyonel',
            price: 599,
            features: [
              '5 Tema Seçeneği',
              '2000 API Çağrısı/Ay',
              'Gelişmiş CRM',
              'WhatsApp Entegrasyonu',
              'Özel Domain Desteği',
              'Öncelikli Destek'
            ],
            popular: true
          },
          {
            id: 3,
            name: 'Enterprise',
            price: 999,
            features: [
              'Sınırsız Tema',
              'Sınırsız API Çağrısı',
              'Tam CRM Paketi',
              'Multi-Language',
              'API Entegrasyonu',
              '7/24 Destek',
              'Özelleştirme'
            ],
            popular: false
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, [user, router]);

  const selectPackage = (pkg: Package) => {
    // Seçilen paketi localStorage'a kaydet ve auth sayfasına yönlendir
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    router.push('/auth');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Digivisor</span>
            </div>
            <button 
              onClick={() => router.push('/auth')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Giriş Yap
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tur Acentanızın <span className="text-blue-600">Dijital Geleceği</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Profesyonel web sitenizi dakikalar içinde kurun. API entegrasyonu, tema seçenekleri ve gelişmiş CRM ile tur satışlarınızı artırın.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">7 Gün Ücretsiz</span>
            </div>
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Kurulum Ücretsiz</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Size Uygun Paketi Seçin
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>Popüler</span>
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-4xl font-bold text-gray-900">₺{pkg.price}</span>
                    <span className="text-gray-500">/ay</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => selectPackage(pkg)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Paketi Seç
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}