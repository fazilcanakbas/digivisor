import React from 'react';

interface ThemePreviewProps {
  theme: number;
  colors: string[];
}

export default function ThemePreview({ theme, colors }: ThemePreviewProps) {
  const [primaryColor, secondaryColor, bgColor, textColor, accentColor] = colors;
  
  // Tema önizlemeleri
  const themeTemplates = {
    // Modern tema
    1: (
      <div className="w-full h-full" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="p-2" style={{ backgroundColor: primaryColor }}>
          <div className="flex justify-between items-center">
            <div className="text-white font-bold">DigiTour</div>
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="mb-3 font-bold">Popüler Turlar</div>
          <div className="flex space-x-2">
            <div className="w-1/2 rounded" style={{ border: `1px solid ${accentColor}` }}>
              <div className="h-12 bg-gray-200"></div>
              <div className="p-1">
                <div className="text-xs font-medium">Kapadokya Turu</div>
                <div className="text-xs mt-1" style={{ color: secondaryColor }}>3 gün</div>
              </div>
            </div>
            <div className="w-1/2 rounded" style={{ border: `1px solid ${accentColor}` }}>
              <div className="h-12 bg-gray-200"></div>
              <div className="p-1">
                <div className="text-xs font-medium">Ege Turu</div>
                <div className="text-xs mt-1" style={{ color: secondaryColor }}>5 gün</div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="h-3 w-full rounded mb-1" style={{ backgroundColor: accentColor }}></div>
            <div className="h-3 w-4/5 rounded mb-1" style={{ backgroundColor: accentColor }}></div>
            <div className="h-3 w-3/5 rounded" style={{ backgroundColor: accentColor }}></div>
          </div>
          <div className="mt-3 flex justify-center">
            <div 
              className="text-xs py-1 px-3 rounded-full text-white" 
              style={{ backgroundColor: primaryColor }}
            >
              Tüm Turları Gör
            </div>
          </div>
        </div>
      </div>
    ),
    
    // Klasik tema
    2: (
      <div className="w-full h-full" style={{ backgroundColor: bgColor, color: textColor }}>
        <div style={{ borderBottom: `2px solid ${primaryColor}` }} className="p-2">
          <div className="font-bold text-center" style={{ color: primaryColor }}>DigiTour</div>
          <div className="flex justify-center space-x-3 mt-1">
            <div className="text-xs">Ana Sayfa</div>
            <div className="text-xs">Turlar</div>
            <div className="text-xs">Hakkında</div>
            <div className="text-xs">İletişim</div>
          </div>
        </div>
        <div className="p-3">
          <div className="text-center mb-2 font-bold" style={{ color: primaryColor }}>Öne Çıkan Turlar</div>
          <div className="flex flex-col space-y-2">
            <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${accentColor}` }}>
              <div className="w-1/3 h-10 bg-gray-200"></div>
              <div className="w-2/3 p-1">
                <div className="text-xs font-medium">İstanbul Kültür Turu</div>
                <div className="text-xs" style={{ color: secondaryColor }}>2 gün, 1 gece</div>
              </div>
            </div>
            <div className="flex rounded overflow-hidden" style={{ border: `1px solid ${accentColor}` }}>
              <div className="w-1/3 h-10 bg-gray-200"></div>
              <div className="w-2/3 p-1">
                <div className="text-xs font-medium">Karadeniz Yayla Turu</div>
                <div className="text-xs" style={{ color: secondaryColor }}>5 gün, 4 gece</div>
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <div 
              className="text-xs py-1 px-3 text-white" 
              style={{ backgroundColor: primaryColor }}
            >
              Rezervasyon Yap
            </div>
          </div>
        </div>
      </div>
    ),
    
    // Lüks tema
    3: (
      <div className="w-full h-full" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="p-3 text-center">
          <div className="font-bold italic" style={{ color: primaryColor }}>DigiTour</div>
          <div className="text-xs mt-1">Premium Tur Deneyimleri</div>
          <div 
            className="h-0.5 w-12 mx-auto mt-1" 
            style={{ backgroundColor: secondaryColor }}
          ></div>
        </div>
        <div className="p-3">
          <div className="rounded-lg overflow-hidden mb-3" style={{ border: `1px solid ${primaryColor}` }}>
            <div className="h-16 bg-gray-200"></div>
            <div className="p-2">
              <div className="text-xs font-medium text-center">Lüks Bodrum Yat Turu</div>
              <div className="text-xs text-center mt-1" style={{ color: secondaryColor }}>Özel Deneyim</div>
              <div 
                className="h-0.5 w-8 mx-auto mt-1" 
                style={{ backgroundColor: accentColor }}
              ></div>
              <div className="text-xs text-center mt-1">₺15,000 / kişi</div>
            </div>
          </div>
          <div className="mt-3 flex justify-center">
            <div 
              className="text-xs py-1 px-4 rounded-none text-white" 
              style={{ backgroundColor: primaryColor }}
            >
              KEŞFET
            </div>
          </div>
        </div>
      </div>
    ),
    
    // Doğa teması
    4: (
      <div className="w-full h-full" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="p-2 flex justify-between items-center" style={{ backgroundColor: primaryColor, color: 'white' }}>
          <div className="font-bold">DigiTour</div>
          <div className="text-xs">Doğa & Macera</div>
        </div>
        <div className="p-3">
          <div className="mb-3">
            <div className="h-20 bg-gray-200 rounded-t-lg"></div>
            <div className="p-2 rounded-b-lg" style={{ backgroundColor: accentColor }}>
              <div className="text-xs font-medium">Likya Yolu Yürüyüşü</div>
              <div className="text-xs flex justify-between mt-1">
                <span>7 gün</span>
                <span style={{ color: secondaryColor }}>Zorlu</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
              <div className="text-xs">Kamp Ekipmanları Dahil</div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
              <div className="text-xs">Profesyonel Rehber</div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: primaryColor }}></div>
              <div className="text-xs">Grup İndirimleri</div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    // Plaj teması
    5: (
      <div className="w-full h-full" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="h-16 bg-gray-200 relative">
          <div 
            className="absolute bottom-0 left-0 right-0 p-2 font-bold text-white text-center"
            style={{ backgroundColor: `${primaryColor}80` }} // %50 opacity
          >
            DigiTour
          </div>
        </div>
        <div className="p-3">
          <div 
            className="text-center mb-3 font-medium"
            style={{ color: primaryColor }}
          >
            Sahil & Deniz Turları
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded overflow-hidden">
              <div className="h-10 bg-gray-200"></div>
              <div 
                className="p-1 text-xs font-medium text-center text-white"
                style={{ backgroundColor: secondaryColor }}
              >
                Fethiye
              </div>
            </div>
            <div className="rounded overflow-hidden">
              <div className="h-10 bg-gray-200"></div>
              <div 
                className="p-1 text-xs font-medium text-center text-white"
                style={{ backgroundColor: secondaryColor }}
              >
                Antalya
              </div>
            </div>
          </div>
          <div 
            className="mt-3 text-center p-1 text-xs"
            style={{ border: `1px dashed ${primaryColor}`, color: primaryColor }}
          >
            Erken rezervasyon %15 indirimli!
          </div>
        </div>
      </div>
    ),
    
    // Özel tema (kullanıcı renkleri)
    0: (
      <div className="w-full h-full" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="p-2" style={{ backgroundColor: primaryColor, color: 'white' }}>
          <div className="flex justify-between items-center">
            <div className="font-bold">DigiTour</div>
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="mb-3">
            <div className="text-sm font-medium" style={{ color: primaryColor }}>
              Özel Temanız
            </div>
            <div className="text-xs">Bu renkleri kullanarak kendi temanızı oluşturun.</div>
          </div>
          
          <div className="space-y-2">
            <div 
              className="p-2 rounded text-xs"
              style={{ backgroundColor: accentColor, color: textColor }}
            >
              Arka plan vurgusu
            </div>
            <div 
              className="p-2 rounded text-xs text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Ana renk buton
            </div>
            <div 
              className="p-2 rounded text-xs text-white"
              style={{ backgroundColor: secondaryColor }}
            >
              İkincil renk buton
            </div>
          </div>
          
          <div className="mt-3 flex space-x-2">
            <div className="h-6 w-1/5 rounded" style={{ backgroundColor: primaryColor }}></div>
            <div className="h-6 w-1/5 rounded" style={{ backgroundColor: secondaryColor }}></div>
            <div className="h-6 w-1/5 rounded" style={{ backgroundColor: bgColor, border: `1px solid ${accentColor}` }}></div>
            <div className="h-6 w-1/5 rounded" style={{ backgroundColor: textColor }}></div>
            <div className="h-6 w-1/5 rounded" style={{ backgroundColor: accentColor }}></div>
          </div>
        </div>
      </div>
    )
  };
  
  // Temaya göre içerik göster
  return themeTemplates[theme as keyof typeof themeTemplates] || themeTemplates[0];
}