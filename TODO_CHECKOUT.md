# 🚧 TODO: Implementasi Fitur Checkout

## Status Saat Ini
✅ **Sudah Selesai:**
- Cart functionality (add, remove, update quantity)
- Add to cart dari catalog
- Protected routes untuk halaman transaksi
- UI untuk halaman cart dengan order summary
- Modal konfirmasi untuk clear cart

🔄 **Perlu Diselesaikan:**
- Implementasi checkout process
- Payment gateway integration
- Stock management setelah purchase
- Transaction creation

## 1. Backend Development

### API Endpoints yang Perlu Dibuat:
```typescript
// src/controllers/transactionController.ts
POST /api/transactions/checkout
- Input: array of { bookId, quantity }
- Validasi stock availability
- Buat transaction record
- Kurangi stock setelah berhasil
- Return: { transactionId, message }

PUT /api/books/:id/stock
- Update stock setelah purchase
- Input: { quantity } (untuk dikurangi)
```

### Database Schema:
```sql
-- Tambah field di tabel transactions jika belum ada:
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) DEFAULT 'pending';
ALTER TABLE transactions ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);
```

### Implementasi Checkout Logic:
```typescript
// Pseudo code untuk checkout process
const checkout = async (userId: number, items: CartItem[]) => {
  // 1. Validasi stock untuk semua items
  for (const item of items) {
    const book = await getBookById(item.bookId);
    if (book.stock < item.quantity) {
      throw new Error(`Stock tidak cukup untuk ${book.title}`);
    }
  }
  
  // 2. Hitung total amount
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // 3. Buat transaction record
  const transaction = await createTransaction({
    userId,
    totalAmount,
    status: 'pending',
    items
  });
  
  // 4. Kurangi stock
  for (const item of items) {
    await updateBookStock(item.bookId, -item.quantity);
  }
  
  return transaction;
};
```

## 2. Frontend Development

### Update handleCheckout di Cart.tsx:
```typescript
// src/pages/Cart.tsx - line sekitar 70
const handleCheckout = async () => {
  setIsLoading(true);
  setErrorMessage(null);
  
  try {
    // Prepare checkout data
    const checkoutData = state.items.map(item => ({
      bookId: item.id,
      quantity: item.quantity
    }));
    
    // Call checkout API
    const response = await api.post('/api/transactions/checkout', {
      items: checkoutData
    });
    
    if (response.data.success) {
      // Clear cart
      clearCart();
      
      // Show success message
      setSuccessMessage('Checkout berhasil! Redirecting...');
      
      // Redirect to transaction detail
      setTimeout(() => {
        navigate(`/transactions/${response.data.transactionId}`);
      }, 2000);
    }
  } catch (error: any) {
    setErrorMessage(
      error.response?.data?.message || 'Terjadi kesalahan saat checkout'
    );
  } finally {
    setIsLoading(false);
  }
};
```

### Tambah State Management:
```typescript
// Tambah di bagian useState di Cart.tsx
const [isLoading, setIsLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState<string | null>(null);
```

### Update UI untuk Loading & Error:
```tsx
{/* Tambah di Cart.tsx sebelum checkout button */}
{errorMessage && (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
    <p className="text-red-800">{errorMessage}</p>
  </div>
)}

{/* Update checkout button */}
<button
  onClick={handleCheckout}
  disabled={isLoading}
  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
    isLoading 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-bookit-primary hover:bg-bookit-dark'
  } text-white`}
>
  {isLoading ? 'Processing...' : 'Checkout'}
</button>
```

## 3. Payment Integration (Optional)

### Midtrans Integration:
```bash
npm install midtrans-client
```

```typescript
// src/utils/payment.ts
import midtransClient from 'midtrans-client';

const snap = new midtransClient.Snap({
  isProduction: false, // set true for production
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

export const createPaymentToken = async (transactionData: any) => {
  const parameter = {
    transaction_details: {
      order_id: `ORDER-${transactionData.id}`,
      gross_amount: transactionData.totalAmount
    },
    customer_details: {
      first_name: transactionData.user.name,
      email: transactionData.user.email
    }
  };
  
  return await snap.createTransaction(parameter);
};
```

## 4. Testing Checklist

### Manual Testing:
- [ ] Add items to cart
- [ ] Update quantities
- [ ] Click checkout button
- [ ] Verify stock reduction
- [ ] Verify transaction creation
- [ ] Test error handling (insufficient stock)
- [ ] Test redirect after successful checkout
- [ ] Verify cart is cleared after checkout

### Edge Cases:
- [ ] Stock habis saat checkout
- [ ] Network error during checkout
- [ ] User logout saat checkout
- [ ] Multiple users checkout item yang sama

## 5. File Locations

**Files yang perlu dimodifikasi:**
- `frontend/src/pages/Cart.tsx` - Update handleCheckout function
- `backend/src/controllers/transactionController.ts` - Add checkout endpoint
- `backend/src/router/transactionRouter.ts` - Add checkout route

**Files yang mungkin perlu dibuat:**
- `frontend/src/utils/payment.ts` - Payment gateway utilities
- `backend/src/utils/stock.ts` - Stock management utilities

## 6. Environment Variables

Tambah di `.env` files:
```bash
# Backend .env
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key

# Frontend .env
VITE_MIDTRANS_CLIENT_KEY=your_client_key
```

---

**Priority Level:** HIGH
**Estimated Time:** 4-6 hours
**Complexity:** Medium

Good luck! 🚀