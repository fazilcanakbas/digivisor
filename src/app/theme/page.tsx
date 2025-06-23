"use client";

import { useState, useEffect } from 'react';
import { 
  Card, Button, Tabs, TabsList, TabsTrigger, Input,
  TabsContent
} from '../components/ui/shadcn';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import { Theme } from '../types/theme';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ThemePreview from '../components/themes/ThemePreview';
import ColorPicker from '../components/themes/ColorPicker';

// Örnek temalar
const sampleThemes: Theme[] = [
  {
    id: "1",
    themeId: 1,
    name: "Modern",
    description: "Temiz ve modern bir tasarım, minimalist yaklaşımla tur sayfalarını ön plana çıkarır.",
    image: "/themes/modern.jpg",
    colors: ["#2563eb", "#60a5fa", "#f8fafc", "#0f172a", "#e2e8f0"]
  },
  {
    id: "2",
    themeId: 2,
    name: "Klasik",
    description: "Geleneksel ve güvenilir bir görünüm, zengin içerikler için ideal bir tema.",
    image: "/themes/classic.jpg",
    colors: ["#16a34a", "#86efac", "#f0fdf4", "#14532d", "#dcfce7"]
  },
  {
    id: "3",
    themeId: 3,
    name: "Lüks",
    description: "Premium ve sofistike bir tasarım, lüks tur paketleri için mükemmel.",
    image: "/themes/luxury.jpg",
    colors: ["#9333ea", "#d8b4fe", "#faf5ff", "#581c87", "#f3e8ff"]
  },
  {
    id: "4",
    themeId: 4,
    name: "Doğa",
    description: "Doğa temalı, yeşil tonları ağırlıklı, outdoor ve doğa turları için ideal.",
    image: "/themes/nature.jpg",
    colors: ["#65a30d", "#bef264", "#f7fee7", "#365314", "#ecfccb"]
  },
  {
    id: "5",
    themeId: 5,
    name: "Plaj",
    description: "Mavi tonlarda, deniz ve plajları vurgulayan, yaz tatili turları için uygun.",
    image: "/themes/beach.jpg",
    colors: ["#0891b2", "#67e8f9", "#ecfeff", "#164e63", "#cffafe"]
  }
];

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [customColors, setCustomColors] = useState<string[]>([
    "#2563eb", // Ana renk
    "#60a5fa", // İkincil renk
    "#f8fafc", // Arka plan rengi
    "#0f172a", // Metin rengi
    "#e2e8f0"  // Vurgu rengi
  ]);
  const [activeTab, setActiveTab] = useState("pre-made");
  const [isLoading, setIsLoading] = useState(false);
  const [agencyTheme, setAgencyTheme] = useState<{themeId: number, colors: string[]} | null>(null);
  const router = useRouter();

  // Acenta tema bilgilerini getir
  useEffect(() => {
    const fetchAgencyTheme = async () => {
      try {
        // API'den mevcut tema bilgisini al
        // const response = await axios.get('/api/agency/theme');
        // setAgencyTheme(response.data);
        
        // Simüle edilmiş veri
        setAgencyTheme({
          themeId: 1,
          colors: ["#2563eb", "#60a5fa", "#f8fafc", "#0f172a", "#e2e8f0"]
        });
        
        // Mevcut tema varsa seçili olarak ayarla
        const currentTheme = sampleThemes.find(theme => theme.themeId === 1);
        if (currentTheme) {
          setSelectedTheme(currentTheme);
        }
      } catch (error) {
        console.error("Tema bilgisi alınamadı:", error);
      }
    };
    
    fetchAgencyTheme();
  }, []);

  // Tema kaydet
  const saveTheme = async () => {
    setIsLoading(true);
    
    try {
      const themeData = {
        themeId: selectedTheme?.themeId || 0,
        colors: activeTab === "pre-made" ? selectedTheme?.colors : customColors
      };
      
      // API'ye tema tercihini gönder
      // await axios.post('/api/agency/theme', themeData);
      
      // Simüle edilmiş başarılı yanıt (gerçekte API'den gelecek)
      setTimeout(() => {
        setAgencyTheme(themeData);
        setIsLoading(false);
        alert("Tema başarıyla uygulandı!");
      }, 1000);
      
    } catch (error) {
      console.error("Tema kaydedilemedi:", error);
      setIsLoading(false);
      alert("Tema kaydedilirken bir hata oluştu.");
    }
  };

  // Renk değiştirme
  const handleColorChange = (index: number, color: string) => {
    const newColors = [...customColors];
    newColors[index] = color;
    setCustomColors(newColors);
  };

  // Renk isimlendirmeleri
  const colorLabels = [
    { name: "Ana Renk", description: "Butonlar ve ana aksiyon öğeleri" },
    { name: "İkincil Renk", description: "Vurgular ve ikincil öğeler" },
    { name: "Arka Plan Rengi", description: "Sayfaların arka plan rengi" },
    { name: "Metin Rengi", description: "Tüm metinlerin rengi" },
    { name: "Vurgu Rengi", description: "Kenarlıklar ve ayraçlar" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Tema Ayarları</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="pre-made">Hazır Temalar</TabsTrigger>
            <TabsTrigger value="custom">Özel Renkler</TabsTrigger>
          </TabsList>
          
          {/* Hazır Temalar Sekmesi */}
          <TabsContent value="pre-made" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleThemes.map((theme) => (
                <Card
                  key={theme.id}
                  className={`overflow-hidden cursor-pointer transition-all ${
                    selectedTheme?.id === theme.id 
                      ? 'ring-2 ring-blue-500 ring-offset-2' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <div className="relative">
                    {/* Tema önizleme görseli */}
                    <div className="h-48 bg-gray-100">
                      <ThemePreview 
                        theme={theme.themeId}
                        colors={theme.colors} 
                      />
                    </div>
                    
                    {/* Seçili tema işareti */}
                    {selectedTheme?.id === theme.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                        <CheckIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{theme.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
                    
                    {/* Renk paleti */}
                    <div className="flex space-x-2 mt-3">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="h-6 w-6 rounded-full border border-gray-200"
                          style={{ backgroundColor: color }}
                          title={colorLabels[index]?.name || `Renk ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Özel Renkler Sekmesi */}
          <TabsContent value="custom" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Renk Paleti</h3>
                
                {colorLabels.map((label, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">{label.name}</label>
                      <span className="text-xs text-gray-500">{label.description}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className="h-8 w-8 rounded border shadow-sm"
                        style={{ backgroundColor: customColors[index] }}
                      />
                      <ColorPicker
                        color={customColors[index]}
                        onChange={(color) => handleColorChange(index, color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Canlı Önizleme */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Önizleme</h3>
                <div className="h-80 border rounded-lg overflow-hidden bg-white shadow-sm">
                  <ThemePreview 
                    theme={0} // Özel tema
                    colors={customColors} 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Tema Kaydetme */}
        <div className="flex justify-end space-x-3 py-4 border-t">
          <Button variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button 
            onClick={saveTheme}
            disabled={isLoading || (!selectedTheme && activeTab === "pre-made")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Kaydediliyor..." : "Temayı Uygula"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}