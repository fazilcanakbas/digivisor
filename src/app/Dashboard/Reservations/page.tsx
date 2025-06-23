"use client";

import { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, Badge,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Button, Avatar
} from "../../components/ui/shadcn";
import { CalendarIcon, FilterIcon, CheckIcon, XIcon, AlertTriangleIcon } from 'lucide-react';
import DashboardLayout from '../../components/Layouts/DashboardLayout';

type Reservation = {
  id: string;
  customerName: string;
  customerEmail: string;
  tourName: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
};

const sampleReservations: Reservation[] = [
  {
    id: "R1001",
    customerName: "Ahmet Yılmaz",
    customerEmail: "ahmet@example.com",
    tourName: "Kapadokya Kültür Turu",
    startDate: "2023-07-15",
    endDate: "2023-07-18",
    adults: 2,
    children: 1,
    status: "confirmed",
    totalPrice: 4500,
    paymentStatus: "paid"
  },
  {
    id: "R1002",
    customerName: "Ayşe Demir",
    customerEmail: "ayse@example.com",
    tourName: "Ege Kıyıları Turu",
    startDate: "2023-08-05",
    endDate: "2023-08-10",
    adults: 2,
    children: 0,
    status: "pending",
    totalPrice: 6200,
    paymentStatus: "partial"
  },
  {
    id: "R1003",
    customerName: "Mehmet Kaya",
    customerEmail: "mehmet@example.com",
    tourName: "Karadeniz Yaylaları",
    startDate: "2023-07-25",
    endDate: "2023-07-30",
    adults: 1,
    children: 0,
    status: "cancelled",
    totalPrice: 3500,
    paymentStatus: "unpaid"
  },
  {
    id: "R1004",
    customerName: "Zeynep Şahin",
    customerEmail: "zeynep@example.com",
    tourName: "İstanbul Kültür Turu",
    startDate: "2023-08-15",
    endDate: "2023-08-18",
    adults: 2,
    children: 2,
    status: "confirmed",
    totalPrice: 5800,
    paymentStatus: "paid"
  }
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(sampleReservations);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  
  // Durum badge'i
  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckIcon className="h-3 w-3" /> Onaylı
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <AlertTriangleIcon className="h-3 w-3" /> Beklemede
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XIcon className="h-3 w-3" /> İptal
          </Badge>
        );
    }
  };
  
  // Ödeme durumu badge'i
  const getPaymentBadge = (status: Reservation['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Ödendi</Badge>;
      case 'partial':
        return <Badge className="bg-blue-100 text-blue-800">Kısmi Ödeme</Badge>;
      case 'unpaid':
        return <Badge className="bg-red-100 text-red-800">Ödenmedi</Badge>;
    }
  };
  
  // Filtrelenmiş rezervasyonlar
  const filteredReservations = selectedStatus === "all" 
    ? reservations
    : reservations.filter(r => r.status === selectedStatus);
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Tur Rezervasyonları</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">Yeni Rezervasyon</Button>
        </div>
        
        {/* İstatistikler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Toplam Rezervasyon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{reservations.length}</div>
              <p className="text-xs text-gray-500 mt-1">Son 30 gün</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Onaylı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {reservations.filter(r => r.status === 'confirmed').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Aktif rezervasyon</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Beklemede</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {reservations.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Onay bekleyen</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Toplam Ciro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {reservations
                  .filter(r => r.status !== 'cancelled')
                  .reduce((sum, r) => sum + r.totalPrice, 0)
                  .toLocaleString('tr-TR')} ₺
              </div>
              <p className="text-xs text-gray-500 mt-1">Aktif rezervasyonlar</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Filtreler */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-2 sm:items-center">
          <span className="text-sm font-medium">Durum:</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedStatus("all")}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === "all" 
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Tümü
            </button>
            <button 
              onClick={() => setSelectedStatus("confirmed")}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === "confirmed" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Onaylı
            </button>
            <button 
              onClick={() => setSelectedStatus("pending")}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === "pending" 
                  ? "bg-yellow-100 text-yellow-800" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              Beklemede
            </button>
            <button 
              onClick={() => setSelectedStatus("cancelled")}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus === "cancelled" 
                  ? "bg-red-100 text-red-800" 
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              İptal
            </button>
          </div>
        </div>
        
        {/* Rezervasyonlar Tablosu */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rezervasyon No</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Tur</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Kişi</TableHead>
                <TableHead>Tutar</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Ödeme</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell className="font-medium">{reservation.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{reservation.customerName}</div>
                      <div className="text-xs text-gray-500">{reservation.customerEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{reservation.tourName}</TableCell>
                  <TableCell>
                    <div className="flex items-center whitespace-nowrap">
                      <CalendarIcon className="h-3 w-3 mr-1 text-gray-500" />
                      <span>{reservation.startDate.split('-').reverse().join('.')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {reservation.adults + reservation.children} 
                    <span className="text-xs text-gray-500">
                      ({reservation.adults} yetişkin, {reservation.children} çocuk)
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    {reservation.totalPrice.toLocaleString('tr-TR')} ₺
                  </TableCell>
                  <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                  <TableCell>{getPaymentBadge(reservation.paymentStatus)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Detaylar</Button>
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredReservations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-gray-500">
                    Bu kriterlere uygun rezervasyon bulunamadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}