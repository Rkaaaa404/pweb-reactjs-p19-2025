import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BooksList from './pages/BooksList';
// import BookDetail from './pages/BookDetail';
// import AddBook from './pages/AddBook';
// import TransactionsList from './pages/TransactionsList';
// import TransactionDetail from './pages/TransactionDetail';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Routes dengan Navbar & Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/manage-books" element={<BooksList />} />
          {/* <Route path="/books/:id" element={<BookDetail />} /> */}
          {/* <Route path="/add-book" element={<AddBook />} /> */}
          {/* <Route path="/transactions" element={<TransactionsList />} /> */}
          {/* <Route path="/transactions/:id" element={<TransactionDetail />} /> */}
          {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        </Route>
      </Route>

      {/* Routes tanpa Layout (misal: Login, Register) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;