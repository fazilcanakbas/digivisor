"use client";

import { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, Input, Button,
  Tabs, TabsContent, TabsList, TabsTrigger
} from '../../components/ui/shadcn';
import { Save, Upload, Trash2 } from 'lucide-react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { AgencySettings } from '@/hooks/useAgencySettings';
import axios from 'axios';
import ColorPicker from '../../components/themes/ColorPicker';
import ThemePreview from '../../components/themes/ThemePreview';

export default function SettingsPage() {
  const [settings, setSettings] = useState<AgencySettings>({
    companyName: "",
    logo: "",
    colors: {
      primary: "#2563eb",
      secondary: "#60a5fa",
      background: "#f8fafc",
      text: "#0f172a",
      accent: "#e2e8f0",
    },
    heroImage: "",
    heroTitle: "",
    heroSubtitle: "",
    primaryCTA: "",
    secondaryCTA: "",
    toursTitle: "",
    toursSubtitle: "",
    featuresTitle: "",
    featuresSubtitle: "",
    testimonialTitle: "",
    testimonialSubtitle: "",
    footerTagline: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    contactInfo: {
      address: "",
      phone: "",
      email: "",
    }
  });
  
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // Mevcut ayarları yükle
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        
        // API olmadığı için örnek veri
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
        
      } catch (error) {
        console.error('Ayarlar yüklenemedi:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  // Form gönderim işlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API isteği (API olmadığı için simüle ediliyor)
      // await axios.post('/api/agency/settings', settings);
      
      // Başarılı kayıt
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      
    } catch (error) {
      console.error('Ayarlar kaydedilemedi:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Form değişikliklerini işle
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    section?: string, 
    nestedField?: string
  ) => {
    const { name, value } = e.target;
    
    if (section && nestedField) {
      // Nested alan (socialLinks, contactInfo vs.)
      setSettings({
        ...settings,
        [section]: {
          ...settings[section as keyof typeof settings],
          [nestedField]: value
        }
      });
    } else {
      // Ana alanlar
      setSettings({ ...settings, [name]: value });
    }
  };
  
  // Renk değişikliklerini işle
  const handleColorChange = (colorName: string, value: string) => {
    setSettings({
      ...settings,
      colors: {
        ...settings.colors,
        [colorName]: value
      }
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Site Ayarları</h1>
          
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>Kaydediliyor...</>
            ) : isSaved ? (
              <>Kaydedildi!</>
            ) : (
              <>
                <Save className="w-4 h-4" /> Değişiklikleri Kaydet
              </>
            )}
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <TabsTrigger value="general">Genel</TabsTrigger>
            <TabsTrigger value="content">İçerik</TabsTrigger>
            <TabsTrigger value="styling">Görünüm</TabsTrigger>
            <TabsTrigger value="contact">İletişim</TabsTrigger>
          </TabsList>
          
          {/* Genel Ayarlar Sekmesi */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Genel Site Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">
                    Şirket Adı
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Şirket Logosu
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg border flex items-center justify-center bg-white">
                      {settings.logo ? (
                        <img 
                          src={settings.logo} 
                          alt="Logo" 
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-gray-400">Logo Yok</span>
                      )}
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Logo Yükle
                    </Button>
                    {settings.logo && (
                      <Button variant="outline" className="flex items-center gap-2 text-red-500">
                        <Trash2 className="w-4 h-4" /> Sil
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Önerilen boyut: 200x200px, maksimum dosya boyutu: 2MB
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Hero Görseli
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-40 rounded-lg border flex items-center justify-center bg-white overflow-hidden">
                      {settings.heroImage ? (
                        <img 
                          src={settings.heroImage} 
                          alt="Hero" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">Görsel Yok</span>
                      )}
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Görsel Yükle
                    </Button>
                    {settings.heroImage && (
                      <Button variant="outline" className="flex items-center gap-2 text-red-500">
                        <Trash2 className="w-4 h-4" /> Sil
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Önerilen boyut: 1920x1080px, maksimum dosya boyutu: 5MB
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="footerTagline" className="text-sm font-medium">
                    Alt Bilgi Etiketi
                  </label>
                  <Input
                    id="footerTagline"
                    name="footerTagline"
                    value={settings.footerTagline}
                    onChange={handleChange}
                    className="max-w-md"
                    placeholder="Şirketinizin kısa tanıtım cümlesi"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* İçerik Sekmesi */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>İçerik Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Hero Bölümü</h3>
                  <div className="space-y-2">
                    <label htmlFor="heroTitle" className="text-sm font-medium">
                      Hero Başlığı
                    </label>
                    <Input
                      id="heroTitle"
                      name="heroTitle"
                      value={settings.heroTitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="heroSubtitle" className="text-sm font-medium">
                      Hero Alt Başlığı
                    </label>
                    <Input
                      id="heroSubtitle"
                      name="heroSubtitle"
                      value={settings.heroSubtitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="primaryCTA" className="text-sm font-medium">
                        Ana Çağrı Butonu
                      </label>
                      <Input
                        id="primaryCTA"
                        name="primaryCTA"
                        value={settings.primaryCTA}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="secondaryCTA" className="text-sm font-medium">
                        İkincil Çağrı Butonu
                      </label>
                      <Input
                        id="secondaryCTA"
                        name="secondaryCTA"
                        value={settings.secondaryCTA}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <hr />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Turlar Bölümü</h3>
                  <div className="space-y-2">
                    <label htmlFor="toursTitle" className="text-sm font-medium">
                      Turlar Başlığı
                    </label>
                    <Input
                      id="toursTitle"
                      name="toursTitle"
                      value={settings.toursTitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="toursSubtitle" className="text-sm font-medium">
                      Turlar Alt Başlığı
                    </label>
                    <Input
                      id="toursSubtitle"
                      name="toursSubtitle"
                      value={settings.toursSubtitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                </div>
                
                <hr />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Özellikler Bölümü</h3>
                  <div className="space-y-2">
                    <label htmlFor="featuresTitle" className="text-sm font-medium">
                      Özellikler Başlığı
                    </label>
                    <Input
                      id="featuresTitle"
                      name="featuresTitle"
                      value={settings.featuresTitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="featuresSubtitle" className="text-sm font-medium">
                      Özellikler Alt Başlığı
                    </label>
                    <Input
                      id="featuresSubtitle"
                      name="featuresSubtitle"
                      value={settings.featuresSubtitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                </div>
                
                <hr />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Testimonial Bölümü</h3>
                  <div className="space-y-2">
                    <label htmlFor="testimonialTitle" className="text-sm font-medium">
                      Testimonial Başlığı
                    </label>
                    <Input
                      id="testimonialTitle"
                      name="testimonialTitle"
                      value={settings.testimonialTitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="testimonialSubtitle" className="text-sm font-medium">
                      Testimonial Alt Başlığı
                    </label>
                    <Input
                      id="testimonialSubtitle"
                      name="testimonialSubtitle"
                      value={settings.testimonialSubtitle}
                      onChange={handleChange}
                      className="max-w-md"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Görünüm Sekmesi */}
          <TabsContent value="styling">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Renk Şeması</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Ana Renk
                      </label>
                      <ColorPicker 
                        color={settings.colors.primary}
                        onChange={(color) => handleColorChange('primary', color)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        İkincil Renk
                      </label>
                      <ColorPicker 
                        color={settings.colors.secondary}
                        onChange={(color) => handleColorChange('secondary', color)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Arka Plan Rengi
                      </label>
                      <ColorPicker 
                        color={settings.colors.background}
                        onChange={(color) => handleColorChange('background', color)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Metin Rengi
                      </label>
                      <ColorPicker 
                        color={settings.colors.text}
                        onChange={(color) => handleColorChange('text', color)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Vurgu Rengi
                      </label>
                      <ColorPicker 
                        color={settings.colors.accent}
                        onChange={(color) => handleColorChange('accent', color)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Önizleme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <div className="h-72">
                      <ThemePreview 
                        theme={1} // Modern tema
                        colors={[
                          settings.colors.primary,
                          settings.colors.secondary,
                          settings.colors.background,
                          settings.colors.text,
                          settings.colors.accent,
                        ]} 
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Renk değişikliklerini gerçek zamanlı olarak görmek için önizleme.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* İletişim Sekmesi */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Adres
                  </label>
                  <Input
                    id="address"
                    value={settings.contactInfo.address}
                    onChange={(e) => handleChange(e, 'contactInfo', 'address')}
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Telefon
                  </label>
                  <Input
                    id="phone"
                    value={settings.contactInfo.phone}
                    onChange={(e) => handleChange(e, 'contactInfo', 'phone')}
                    className="max-w-md"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-posta
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.contactInfo.email}
                    onChange={(e) => handleChange(e, 'contactInfo', 'email')}
                    className="max-w-md"
                  />
                </div>
                
                <hr />
                
                <h3 className="font-medium">Sosyal Medya Bağlantıları</h3>
                
                <div className="space-y-2">
                  <label htmlFor="facebook" className="text-sm font-medium">
                    Facebook
                  </label>
                  <Input
                    id="facebook"
                    value={settings.socialLinks.facebook}
                    onChange={(e) => handleChange(e, 'socialLinks', 'facebook')}
                    className="max-w-md"
                    placeholder="https://facebook.com/sayfaniz"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium">
                    Twitter
                  </label>
                  <Input
                    id="twitter"
                    value={settings.socialLinks.twitter}
                    onChange={(e) => handleChange(e, 'socialLinks', 'twitter')}
                    className="max-w-md"
                    placeholder="https://twitter.com/kullaniciadi"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">
                    Instagram
                  </label>
                  <Input
                    id="instagram"
                    value={settings.socialLinks.instagram}
                    onChange={(e) => handleChange(e, 'socialLinks', 'instagram')}
                    className="max-w-md"
                    placeholder="https://instagram.com/kullaniciadi"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="linkedin" className="text-sm font-medium">
                    LinkedIn
                  </label>
                  <Input
                    id="linkedin"
                    value={settings.socialLinks.linkedin}
                    onChange={(e) => handleChange(e, 'socialLinks', 'linkedin')}
                    className="max-w-md"
                    placeholder="https://linkedin.com/company/sirketadi"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}