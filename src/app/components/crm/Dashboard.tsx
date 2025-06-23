'use client';

export default function Dashboard() {
  const stats = [
    { name: 'Bu Ay Rezervasyon', value: '24', change: '+12%', color: 'blue' },
    { name: 'Toplam Gelir', value: '₺48,500', change: '+8%', color: 'green' },
    { name: 'Site Ziyaretçisi', value: '1,247', change: '+23%', color: 'purple' },
    { name: 'Dönüşüm Oranı', value: '%3.2', change: '+0.5%', color: 'orange' },
  ];

  const recentReservations = [
    { id: 1, customer: 'Ahmet Yılmaz', tour: 'Kapadokya Turu', date: '2024-07-15', status: 'onaylı' },
    { id: 2, customer: 'Elif Demir', tour: 'Antalya Turu', date: '2024-07-20', status: 'beklemede' },
    { id: 3, customer: 'Mehmet Kaya', tour: 'İstanbul Turu', date: '2024-07-25', status: 'onaylı' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium text-${stat.color}-600`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Reservations */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Son Rezervasyonlar</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Müşteri</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentReservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {reservation.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.tour}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reservation.status === 'onaylı' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}