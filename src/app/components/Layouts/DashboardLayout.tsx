import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  MapIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ChevronDownIcon,
  BarChart2Icon,
  PaletteIcon
} from 'lucide-react';
import { useState } from 'react';
import { Avatar } from '../ui/shadcn';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Genel Bakış', href: '/dashboard', icon: HomeIcon },
    { name: 'CRM', href: '/dashboard/crm', icon: UsersIcon },
    { name: 'Tur Rezervasyonları', href: '/Dashboard/Reservations', icon: CalendarIcon },
     {name: 'Tema Ayarları', href: '/theme', icon: PaletteIcon }, 
    { name: 'Turlar', href: '/Dashboard/Tours', icon: MapIcon },
    { name: 'Raporlar', href: '/dashboard/reports', icon: BarChart2Icon },
    { name: 'Ayarlar', href: '/Dashboard/settings', icon: SettingsIcon },
     { name: 'Modern Tema', href: '/Dashboard/ModernThema', icon: SettingsIcon },
    
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-gray-200 transition-all duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">DigiTour</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 rounded-md lg:hidden hover:bg-gray-100"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6 p-2 rounded-lg bg-blue-50">
            <Avatar className="h-10 w-10">
              <div className="flex h-full w-full items-center justify-center bg-blue-600 text-white font-medium">
                DT
              </div>
            </Avatar>
            <div>
              <div className="font-medium">DigiTour Agency</div>
              <div className="text-xs text-gray-500">admin@digitour.com</div>
            </div>
          </div>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <LogOutIcon className="mr-3 h-5 w-5 text-gray-400" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center bg-white border-b border-gray-200 px-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1 mr-4 rounded-md lg:hidden hover:bg-gray-100"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          
          <div className="flex-1 flex justify-between items-center">
            <div className="text-lg font-semibold">
              {menuItems.find(item => item.href === pathname)?.name || 'Dashboard'}
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {/* Bildirim, mesaj vb. komponentleri burada */}
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}