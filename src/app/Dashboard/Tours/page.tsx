"use client";

import { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle,
  Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Badge
} from "../../components/ui/shadcn";
import { PlusIcon, EditIcon, TrashIcon, EyeIcon } from 'lucide-react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';

type Tour = {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  location: string;
  image?: string;
  maxGroupSize: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
};

const sampleTours: Tour[] = [
  {
    id: "T1001",
    name: "Kapadokya Kültür Turu",
    description: "Eşsiz peri bacaları ve sıcak hava balonları ile Kapadokya'yı keşfedin.",
    duration: 3,
    price: 1500,
    location: "Nevşehir",
    maxGroupSize: 15,
    featured: true,
    active: true,
    createdAt: "2023-01-15"
  },
  {
    id: "T1002",
    name: "Ege Kıyıları Turu",
    description: "Antik kentler ve mavi bayraklı plajlar ile Ege'nin muhteşem kıyılarını gezin.",
    duration: 5,
    price: 3000,
    location: "İzmir, Muğla",
    maxGroupSize: 12,
    featured: true,
    active: true,
    createdAt: "2023-02-10"
  },
  {
    id: "T1003",
    name: "Karadeniz Yaylaları",
    description: "Yeşilin her tonunu görebileceğiniz yaylalar ve otantik köyler.",
    duration: 4,
    price: 2200,
    location: "Rize, Trabzon",
    maxGroupSize: 10,
    featured: false,
    active: true,
    createdAt: "2023-03-05"
  },
  {
    id: "T1004",
    name: "İstanbul Kültür Turu",
    description: "Tarihi yarımada ve Boğaz manzarası ile İstanbul'un zengin kültürünü keşfedin.",
    duration: 2,
    price: 1200,
    location: "İstanbul",
    maxGroupSize: 20,
    featured: true,
    active: true,
    createdAt: "2023-01-20"
  },
  {
    id: "T1005",
    name: "Güneydoğu Anadolu Turu",
    description: "Mezopotamya'nın kadim şehirlerini ve lezzetlerini keşfedin.",
    duration: 6,
    price: 3500,
    location: "Diyarbakır, Mardin, Şanlıurfa",
    maxGroupSize: 15,
    featured: false,
    active: false,
    createdAt: "2023-04-12"
  }
];

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>(sampleTours);
  const [view, setView] = useState<'grid' | 'table'>('table');
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Turlar</h1>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            Yeni Tur
          </Button>
        </div>
        
        {/* İstatistikler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Toplam Tur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tours.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Aktif Turlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {tours.filter(t => t.active).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Öne Çıkanlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {tours.filter(t => t.featured).length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ortalama Fiyat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(
                  tours.reduce((acc, tour) => acc + tour.price, 0) / tours.length
                ).toLocaleString('tr-TR')} ₺
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Görünüm ve Filtreleme Seçenekleri */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${view === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2 rounded ${view === 'table' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filtre seçenekleri */}
            <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
              <option>Tüm Turlar</option>
              <option>Aktif Turlar</option>
              <option>Pasif Turlar</option>
              <option>Öne Çıkanlar</option>
            </select>
          </div>
        </div>
        
        {/* Turlar Listesi */}
        {view === 'table' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tur Adı</TableHead>
                  <TableHead>Lokasyon</TableHead>
                  <TableHead>Süre</TableHead>
                  <TableHead>Kapasite</TableHead>
                  <TableHead>Fiyat</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div className="font-medium">{tour.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[250px]">{tour.description}</div>
                    </TableCell>
                    <TableCell>{tour.location}</TableCell>
                    <TableCell>{tour.duration} gün</TableCell>
                    <TableCell>{tour.maxGroupSize} kişi</TableCell>
                    <TableCell className="font-medium">{tour.price.toLocaleString('tr-TR')} ₺</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {tour.active ? (
                          <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">Pasif</Badge>
                        )}
                        
                        {tour.featured && (
                          <Badge className="bg-blue-100 text-blue-800">Öne Çıkan</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <EditIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tours.map((tour) => (
              <Card key={tour.id} className="overflow-hidden">
                <div className="h-40 bg-gray-200 relative">
                  {tour.image ? (
                    <img 
                      src={tour.image} 
                      alt={tour.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-1">
                    {tour.featured && (
                      <Badge className="bg-blue-600 text-white">Öne Çıkan</Badge>
                    )}
                    {!tour.active && (
                      <Badge className="bg-gray-600 text-white">Pasif</Badge>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{tour.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Lokasyon:</span>
                      <div>{tour.location}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Süre:</span>
                      <div>{tour.duration} gün</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Kapasite:</span>
                      <div>{tour.maxGroupSize} kişi</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Fiyat:</span>
                      <div className="font-medium">{tour.price.toLocaleString('tr-TR')} ₺</div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4 mr-1" /> Detaylar
                    </Button>
                    <Button variant="outline" size="sm">
                      <EditIcon className="h-4 w-4 mr-1" /> Düzenle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}