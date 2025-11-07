# Panduan Menjalankan Proyek

Proyek ini terdiri dari backend (Express.js + Prisma + PostgreSQL) dan frontend (React + Vite).

## Prerequisites
- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Git

## Setup Awal

### 1. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Setup Database (Prisma)

```bash
cd backend
# Generate Prisma Client
npx prisma generate

# Push schema ke database (untuk development)
npx prisma db push

# Atau jika ingin menggunakan migrations
npx prisma migrate dev --name init

# Seed database dengan data awal (opsional)
npm run seed
```

### 3. Menjalankan Aplikasi

**Buka 3 terminal berbeda:**

#### Terminal 1 - Backend Server
```bash
cd backend
npm run start:dev
```
Server akan berjalan di: http://localhost:5000

#### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend akan berjalan di: http://localhost:5173

#### Terminal 3 - Prisma Studio (untuk melihat database)
```bash
cd backend
npx prisma studio
```
Prisma Studio akan berjalan di: http://localhost:5555

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://neondb_owner:npg_ZG7ERa0hXJew@ep-lucky-rain-a1v7bgpk-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET="your-jwt-secret-key-change-this-in-production"
PORT=5000
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:5000"
VITE_APP_ENV=development
```

## API Endpoints

### Authentication
- POST `/auth/register` - Register user baru
- POST `/auth/login` - Login user
- GET `/auth/me` - Get current user info

### Books
- GET `/books` - Get semua buku
- POST `/books` - Tambah buku baru
- GET `/books/:id` - Get buku by ID
- PUT `/books/:id` - Update buku
- DELETE `/books/:id` - Delete buku

### Genres
- GET `/genres` - Get semua genre
- POST `/genres` - Tambah genre baru

### Transactions
- GET `/transactions` - Get transaksi user
- POST `/transactions` - Buat transaksi baru

## Troubleshooting

### Jika ada error koneksi database:
1. Pastikan database URL benar di file .env
2. Cek koneksi internet
3. Jalankan `npx prisma db push` ulang

### Jika ada error CORS:
1. Pastikan frontend URL benar di backend .env
2. Restart backend server

### Jika ada error TypeScript:
1. Jalankan `npm run build` untuk cek error
2. Pastikan semua dependencies terinstall

## Commands Reference

### Backend Commands
- `npm run start:dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm start` - Jalankan production server
- `npm run seed` - Seed database

### Frontend Commands
- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview production build

### Prisma Commands
- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema ke database
- `npx prisma migrate dev` - Create dan apply migration
- `npx prisma studio` - Buka Prisma Studio
- `npx prisma db seed` - Seed database