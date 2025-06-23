const { MongoClient } = require('mongodb');
// veya ES Modules için:
// import { MongoClient } from 'mongodb';

require('dotenv').config(); // .env dosyasını yükle

async function seed() {
  const uri = process.env.DATABASE_URL;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log("MongoDB'ye bağlanıldı");
    
    const database = client.db('Digivisor'); // Veritabanı adınız
    const packageCollection = database.collection('Package');
    const themeCollection = database.collection('Theme');
    
    // Mevcut verileri kontrol et
    const packageCount = await packageCollection.countDocuments();
    const themeCount = await themeCollection.countDocuments();
    
    // Package verileri
    if (packageCount === 0) {
      await packageCollection.insertMany([
        {
          packageId: 1,
          name: 'Başlangıç',
          price: 299,
          features: [
            '1 Tema Seçeneği',
            '500 API Çağrısı/Ay',
            'Temel CRM',
            'Email Desteği',
            'Subdomain (.turplatform.com)'
          ],
          popular: false
        },
        {
          packageId: 2,
          name: 'Profesyonel',
          price: 599,
          features: [
            '5 Tema Seçeneği',
            '2000 API Çağrısı/Ay',
            'Gelişmiş CRM',
            'WhatsApp Entegrasyonu',
            'Özel Domain Desteği', 
            'Öncelikli Destek'
          ],
          popular: true
        },
        {
          packageId: 3,
          name: 'Enterprise',
          price: 999,
          features: [
            'Sınırsız Tema',
            'Sınırsız API Çağrısı',
            'Tam CRM Paketi',
            'Multi-Language',
            'API Entegrasyonu',
            '7/24 Destek',
            'Özelleştirme'
          ],
          popular: false
        }
      ]);
      console.log('Package verileri eklendi');
    }
    
    // Theme verileri
    if (themeCount === 0) {
      await themeCollection.insertMany([
        {
          themeId: 1,
          name: 'Modern Tourism',
          description: 'Minimalist ve modern tasarım',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMwODRmZiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+TW9kZXJuPC90ZXh0Pjwvc3ZnPg==',
          colors: ['#3084ff', '#1d4ed8']
        },
        {
          themeId: 2,
          name: 'Adventure',
          description: 'Macera ve doğa temalı tasarım',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzEwYjk4MSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCI+QWR2ZW50dXJlPC90ZXh0Pjwvc3ZnPg==',
          colors: ['#10b981', '#059669']
        },
        {
          themeId: 3,
          name: 'Luxury Travel',
          description: 'Lüks ve prestij odaklı tasarım',
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzc5NTU0OCIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmaWxsPSIjZmZkNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5MdXh1cnk8L3RleHQ+PC9zdmc+',
          colors: ['#795548', '#ffd700']
        }
      ]);
      console.log('Theme verileri eklendi');
    }
    
    console.log('Seed işlemi tamamlandı');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);