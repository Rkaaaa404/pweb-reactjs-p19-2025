import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const TransactionsList = () => {
  // TODO: Implement state untuk:
  // search, sort, pagination

  const [transactions, setTransactions] = useState<any[]>([]); // Ganti 'any' dengan Tipe Transaksi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/transactions'); //
        setTransactions(response.data.data);
      } catch (err) {
        setError('Gagal memuat riwayat transaksi.'); //
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>; //
  if (error) return <div className="p-8 text-red-500">{error}</div>; //

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-bookit-dark">Riwayat Transaksi</h1>
      {/* TODO: Tambahkan UI Search ID dan Sort */}

      <div className="space-y-4">
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <div key={tx.id} className="border border-bookit-border rounded-lg p-4 shadow-sm bg-bookit-white">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-bookit-text-medium">ID Transaksi: {tx.id}</p>
                  <p className="text-lg font-semibold text-bookit-primary">Total: Rp {tx.totalPrice.toLocaleString()}</p>
                  <p className="text-sm text-bookit-text-medium">{tx.totalAmount} item</p>
                </div>
                <Link to={`/transactions/${tx.id}`} className="self-start text-sm text-bookit-dark hover:underline">
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-bookit-text-medium">Belum ada riwayat transaksi.</p> // Empty state
        )}
      </div>

      {/* TODO: Tambahkan UI Pagination */}
    </div>
  );
};

export default TransactionsList;