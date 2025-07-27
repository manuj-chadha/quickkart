import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import CategoryPage from './pages/CategoryPage';
import CategoriesPage from './pages/CategoriesPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DealsPage from './pages/DealsPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;