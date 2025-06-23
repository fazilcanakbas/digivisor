'use client';

import { Eye, User } from 'lucide-react';

interface CRMHeaderProps {
  user: any;
  packageName: string;
  themeName: string;
  onLogout: () => void;
}

export default function CRMHeader({ user, packageName, themeName, onLogout }: CRMHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.agencyName || 'Acenta Adı'} - CRM Panel
            </h1>
            <p className="text-gray-600">
              Tema: {themeName || 'Seçilmedi'} | Paket: {packageName || 'Bilinmiyor'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Siteyi Görüntüle</span>
            </button>
            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-gray-700">{user?.email}</span>
                <button 
                  onClick={onLogout}
                  className="text-sm text-red-600 text-left hover:text-red-800"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}