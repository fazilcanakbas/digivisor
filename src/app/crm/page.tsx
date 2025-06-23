"use client";

import { useState, useEffect } from 'react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Badge, Button, Avatar, Input, Tabs, TabsContent, TabsList, TabsTrigger
} from "../components/ui/shadcn";
import {
  ChevronDownIcon, PlusIcon, SearchIcon, FilterIcon, MoreVertical,
  PhoneIcon, MailIcon, UserIcon, CalendarIcon, TagIcon
} from "lucide-react";
import DashboardLayout from '../components/Layouts/DashboardLayout';

// Müşteri tipi tanımı
type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "proposal" | "customer" | "inactive";
  lastContact: string;
  source: string;
  notes: string;
  image?: string;
};

// Örnek veri
const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 532 123 4567",
    status: "new",
    lastContact: "2023-06-20",
    source: "Web Sitesi",
    notes: "Kapadokya turu hakkında bilgi istedi",
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse@example.com",
    phone: "+90 555 987 6543",
    status: "contacted",
    lastContact: "2023-06-18",
    source: "Referans",
    notes: "Ege turu için fiyat teklifi gönderildi",
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet@example.com",
    phone: "+90 542 456 7890",
    status: "proposal",
    lastContact: "2023-06-15",
    source: "Instagram",
    notes: "Karadeniz turu için teklif bekliyor",
  },
  {
    id: "4",
    name: "Zeynep Şahin",
    email: "zeynep@example.com",
    phone: "+90 505 333 2211",
    status: "customer",
    lastContact: "2023-06-10",
    source: "Google",
    notes: "İstanbul turu satın aldı, memnun kaldı",
  },
  {
    id: "5",
    name: "Ali Öztürk",
    email: "ali@example.com",
    phone: "+90 533 111 2233",
    status: "inactive",
    lastContact: "2023-05-25",
    source: "Facebook",
    notes: "Uzun süredir iletişime geçilmedi",
  }
];

export default function CrmPage() {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  
  // Durum badge'ini oluşturan yardımcı fonksiyon
  const getStatusBadge = (status: Customer["status"]) => {
    const statusStyles = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-purple-100 text-purple-800",
      proposal: "bg-yellow-100 text-yellow-800",
      customer: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800"
    };
    
    const statusLabels = {
      new: "Yeni",
      contacted: "İletişim Kuruldu",
      proposal: "Teklif Aşamasında",
      customer: "Müşteri",
      inactive: "Pasif"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
        {statusLabels[status]}
      </span>
    );
  };
  
  // Filtrelenmiş müşterileri getir
  const getFilteredCustomers = () => {
    let filtered = customers;
    
    // Arama terimiyle filtrele
    if (searchTerm) {
      filtered = filtered.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }
    
    // Seçili sekmeye göre filtrele
    if (activeTab !== "all") {
      filtered = filtered.filter(customer => customer.status === activeTab);
    }
    
    return filtered;
  };
  
  // Yeni müşteri ekle
  const addNewCustomer = (newCustomer: Omit<Customer, 'id'>) => {
    const customer = {
      ...newCustomer,
      id: `${customers.length + 1}`,
      lastContact: new Date().toISOString().split('T')[0]
    };
    
    setCustomers([...customers, customer as Customer]);
    setShowNewCustomerForm(false);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Müşteri İlişkileri Yönetimi</h1>
          <Button 
            onClick={() => setShowNewCustomerForm(true)}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            Yeni Müşteri
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Filtre ve Arama */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Müşteri ara..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 gap-1">
                <TabsTrigger value="all">Tümü</TabsTrigger>
                <TabsTrigger value="new">Yeni</TabsTrigger>
                <TabsTrigger value="contacted">İletişimde</TabsTrigger>
                <TabsTrigger value="proposal">Teklif</TabsTrigger>
                <TabsTrigger value="customer">Müşteri</TabsTrigger>
                <TabsTrigger value="inactive">Pasif</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Müşteri Tablosu */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Müşteri</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Kaynak</TableHead>
                  <TableHead>Son İletişim</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getFilteredCustomers().map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          {customer.image ? (
                            <img src={customer.image} alt={customer.name} />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600 font-medium">
                              {customer.name.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[150px]">
                            {customer.notes}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <MailIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <PhoneIcon className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <TagIcon className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{customer.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{customer.lastContact}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {getFilteredCustomers().length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchTerm 
                        ? "Aramanızla eşleşen müşteri bulunamadı." 
                        : "Bu kategoride müşteri bulunamadı."
                      }
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        {/* Yaklaşan Görevler veya İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri İstatistikleri</CardTitle>
              <CardDescription>Müşteri durumlarına göre dağılım</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Yeni Müşteriler</span>
                  <Badge variant="outline" className="bg-blue-50">{customers.filter(c => c.status === 'new').length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">İletişim Kurulanlar</span>
                  <Badge variant="outline" className="bg-purple-50">{customers.filter(c => c.status === 'contacted').length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Teklifte Olanlar</span>
                  <Badge variant="outline" className="bg-yellow-50">{customers.filter(c => c.status === 'proposal').length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Aktif Müşteriler</span>
                  <Badge variant="outline" className="bg-green-50">{customers.filter(c => c.status === 'customer').length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pasif Müşteriler</span>
                  <Badge variant="outline" className="bg-gray-100">{customers.filter(c => c.status === 'inactive').length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Kaynak Analizi</CardTitle>
              <CardDescription>Müşteri kaynaklarına göre dağılım</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(new Set(customers.map(c => c.source))).map(source => (
                  <div key={source} className="flex justify-between">
                    <span className="text-sm">{source}</span>
                    <Badge variant="outline" className="bg-gray-50">
                      {customers.filter(c => c.source === source).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Son İşlemler</CardTitle>
              <CardDescription>Son müşteri etkileşimleri</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {customers
                  .sort((a, b) => new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime())
                  .slice(0, 3)
                  .map(customer => (
                    <div key={customer.id} className="p-4 flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600 font-medium">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </div>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{customer.lastContact}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Yeni Müşteri Ekleme Formu Modal */}
      {showNewCustomerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Yeni Müşteri Ekle</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              addNewCustomer({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                status: 'new',
                lastContact: new Date().toISOString().split('T')[0],
                source: formData.get('source') as string,
                notes: formData.get('notes') as string,
              });
            }}>
              <div className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">İsim Soyisim</label>
                  <Input id="name" name="name" required className="w-full mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <Input id="email" name="email" type="email" required className="w-full mt-1" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">Telefon</label>
                  <Input id="phone" name="phone" className="w-full mt-1" />
                </div>
                <div>
                  <label htmlFor="source" className="block text-sm font-medium">Kaynak</label>
                  <select
                    id="source"
                    name="source"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="Web Sitesi"
                  >
                    <option>Web Sitesi</option>
                    <option>Referans</option>
                    <option>Instagram</option>
                    <option>Facebook</option>
                    <option>Google</option>
                    <option>Diğer</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium">Notlar</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  ></textarea>
                </div>
              </div>
              <div className="mt-5 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewCustomerForm(false)}
                >
                  İptal
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Ekle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}