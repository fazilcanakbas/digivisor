import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// MongoDB bağlantısı
const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/Digivisor';
const client = new MongoClient(uri);

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret_key';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Gelen istek gövdesi:', body);
    
    const { email, password, agencyName, packageId } = body;
    
    // Gerekli alanları kontrol et
    if (!email || !password || !agencyName || !packageId) {
      return NextResponse.json(
        { error: 'Email, şifre, acenta adı ve paket ID gereklidir' },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db();
    
    // Email kontrolü
    const existingUser = await database.collection('User').findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }
    
    try {
      // Paket varlığını kontrol et
      let packageObjectId;
      try {
        packageObjectId = new ObjectId(packageId);
      } catch (error) {
        return NextResponse.json(
          { error: 'Geçersiz paket ID formatı' },
          { status: 400 }
        );
      }
      
      const packageExists = await database.collection('Package').findOne({ _id: packageObjectId });
      
      if (!packageExists) {
        return NextResponse.json(
          { error: 'Belirtilen paket bulunamadı' },
          { status: 400 }
        );
      }
      
      // Şifre hashleme
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Subdomain oluşturma
      const subdomain = agencyName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      
      // Subdomain kontrolü
      const existingAgency = await database.collection('Agency').findOne({ subdomain });
      if (existingAgency) {
        return NextResponse.json(
          { error: 'Bu acenta adı zaten kullanılıyor. Lütfen farklı bir isim seçin.' },
          { status: 400 }
        );
      }
      
      // Kullanıcıyı oluştur
      const userId = new ObjectId();
      const now = new Date();
      
      const userResult = await database.collection('User').insertOne({
        _id: userId,
        email,
        password: hashedPassword,
        agencyName,
        packageId: packageExists.packageId,
        createdAt: now,
        updatedAt: now
      });
      
      // Acentayı oluştur
      const agencyId = new ObjectId();
      const agencyResult = await database.collection('Agency').insertOne({
        _id: agencyId,
        userId: userId,
        name: agencyName,
        packageId: packageExists.packageId,
        subdomain,
        createdAt: now,
        updatedAt: now
      });
      
      // Token oluştur
      const token = jwt.sign(
        { userId: userId.toString(), email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Kullanıcı ve acenta bilgilerini oluştur
      const userWithAgency = {
        id: userId.toString(),
        email,
        agencyName,
        packageId: packageExists.packageId,
        agency: {
          id: agencyId.toString(),
          name: agencyName,
          packageId: packageExists.packageId,
          subdomain
        }
      };
      
      return NextResponse.json({
        message: 'Kullanıcı başarıyla kaydedildi',
        token,
        user: userWithAgency
      }, { status: 201 });
      
    } catch (error) {
      console.error('Kullanıcı oluşturma hatası:', error);
      return NextResponse.json(
        { error: 'Veritabanı işlemi sırasında hata oluştu' },
        { status: 500 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası, lütfen tekrar deneyin' },
      { status: 500 }
    );
  }
}