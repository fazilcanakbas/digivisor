'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const router = useRouter();
  const { user, login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agencyName: '',
    isLogin: true
  });

  useEffect(() => {
    // Eğer kullanıcı girişi yapılmışsa CRM'e yönlendir
    if (user) {
      router.push('/crm');
      return;
    }
    
    // localStorage'dan seçilen paketi al
    const storedPackage = localStorage.getItem('selectedPackage');
    if (storedPackage) {
      setSelectedPackage(JSON.parse(storedPackage));
    } else {
      // Paket seçilmemişse ana sayfaya yönlendir
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (formData.isLogin) {
        // Giriş yap
        await login(formData.email, formData.password);
        toast.success('Giriş başarılı!');
        
        // Eğer kullanıcının teması yoksa tema seçimine, varsa CRM'e yönlendir
        if (user?.themeId) {
          router.push('/crm');
        } else {
          router.push('/theme');
        }
      } else {
        // Şifre kontrolü
        if (formData.password !== formData.confirmPassword) {
          toast.error('Şifreler eşleşmiyor');
          return;
        }
        
        // Kayıt ol
        if (!selectedPackage) {
          toast.error('Lütfen önce bir paket seçin');
          router.push('/');
          return;
        }
        
        await register(
          formData.email, 
          formData.password, 
          formData.agencyName, 
          selectedPackage.id
        );
        toast.success('Kayıt başarılı!');
        router.push('/theme');
      }
    } catch (error: any) {
      toast.error(error.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (!selectedPackage && !formData.isLogin) {
    return <div className="flex items-center justify-center min-h-screen">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900">
              {formData.isLogin ? 'Giriş Yap' : 'Hesap Oluştur'}
            </h2>
            {selectedPackage && (
              <p className="text-gray-600 mt-2">
                {selectedPackage.name} paketini seçtiniz (₺{selectedPackage.price}/ay)
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {!formData.isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Acenta Adı
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Acenta adınız"
                    value={formData.agencyName}
                    onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              {!formData.isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Şifre Tekrar
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6 disabled:bg-blue-400"
            >
              {loading ? 'Lütfen bekleyin...' : formData.isLogin ? 'Giriş Yap' : 'Hesap Oluştur ve Devam Et'}
            </button>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={() => setFormData({...formData, isLogin: !formData.isLogin})}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {formData.isLogin ? 'Hesabınız yok mu? Kayıt olun' : 'Zaten hesabınız var mı? Giriş yapın'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}