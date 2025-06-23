"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export interface AgencySettings {
  companyName: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  toursTitle: string;
  toursSubtitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  footerTagline: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  contactInfo: {
    address: string;
    phone: string;
    email: string;
  };
}

export function useAgencySettings() {
  const [settings, setSettings] = useState<AgencySettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      
      // JWT token'ı localStorage'dan al
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.get('/api/agency/settings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setSettings(response.data);
      
    } catch (err: any) {
      console.error('Ajans ayarları getirilemedi:', err);
      setError(err.response?.data?.error || 'Ajans ayarları yüklenirken bir hata oluştu.');
      
      // Fallback olarak default ayarları kullan
      setSettings({
        companyName: "DigiTour",
        logo: "/logo.png",
        colors: {
          primary: "#2563eb",
          secondary: "#60a5fa",
          background: "#f8fafc",
          text: "#0f172a",
          accent: "#e2e8f0",
        },
        heroImage: "/images/hero.jpg",
        heroTitle: "Unutulmaz Seyahat Deneyimleri Keşfedin",
        heroSubtitle: "En iyi tur paketleri ve özel deneyimlerle hayalinizdeki tatili planlayın.",
        primaryCTA: "Turları Keşfet",
        secondaryCTA: "Bize Ulaşın",
        toursTitle: "Öne Çıkan Turlar",
        toursSubtitle: "En popüler ve beğeni toplayan tur paketlerimizi keşfedin.",
        featuresTitle: "Neden Bizi Tercih Etmelisiniz?",
        featuresSubtitle: "Profesyonel hizmet ve kaliteli deneyimler için doğru adres.",
        testimonialTitle: "Müşteri Yorumları",
        testimonialSubtitle: "Katıldıkları turlardan sonra müşterilerimizin değerli düşünceleri.",
        footerTagline: "Profesyonel tur ve seyahat hizmetleri.",
        socialLinks: {
          facebook: "https://facebook.com",
          twitter: "https://twitter.com",
          instagram: "https://instagram.com",
          linkedin: "https://linkedin.com",
        },
        contactInfo: {
          address: "Atatürk Caddesi No:123, İstanbul",
          phone: "+90 212 123 4567",
          email: "info@digitour.com",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: AgencySettings) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      await axios.post('/api/agency/settings', newSettings, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setSettings(newSettings);
      return { success: true };
      
    } catch (err: any) {
      console.error('Ayarlar güncellenemedi:', err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Ayarlar güncellenirken bir hata oluştu.' 
      };
    }
  };

  return { settings, isLoading, error, updateSettings, refetch: fetchSettings };
}