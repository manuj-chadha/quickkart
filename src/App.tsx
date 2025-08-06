// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Layout } from './components/layout/Layout';
// import { CartProvider } from './context/CartContext';
// import HomePage from './pages/HomePage';
// import ProductsPage from './pages/ProductsPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CartPage from './pages/CartPage';
// import CheckoutPage from './pages/CheckoutPage';
// import OrderConfirmationPage from './pages/OrderConfirmationPage';
// import ProfilePage from './pages/ProfilePage';
// import OrderHistoryPage from './pages/OrderHistoryPage';
// import CategoryPage from './pages/CategoryPage';
// import CategoriesPage from './pages/CategoriesPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import DealsPage from './pages/DealsPage';
// import AboutPage from './pages/AboutPage';

// // Admin Pages
// import AdminLoginPage from './pages/admin/AdminLoginPage';
// import DashboardPage from './pages/admin/DashboardPage';
// import AdminProductsPage from './pages/admin/ProductsPage';
// import AdminCategoriesPage from './pages/admin/CategoriesPage';
// import AdminOrdersPage from './pages/admin/OrdersPage';

// function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/products" element={<ProductsPage />} />
//             <Route path="/product/:_id" element={<ProductDetailPage />} />
//             <Route path="/categories" element={<CategoriesPage />} />
//             <Route path="/category/:_id" element={<CategoryPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/checkout" element={<CheckoutPage />} />
//             <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/orders" element={<OrderHistoryPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/deals" element={<DealsPage />} />
//             <Route path="/about" element={<AboutPage />} />
//           </Routes>
//         </Layout>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;




import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
// import { AdminProvider } from './context/AdminContext';
import { AdminLayout } from './components/admin/AdminLayout';
import AdminLoginPage, { AdminRoute } from './components/admin/AdminRoute';
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

// Admin Pages
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AdminCategoriesPage from './pages/admin/CategoriesPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import ProductCreatePage from './pages/admin/CreateProduct';
import CategoryFormPage from './pages/admin/CategoryFormPage';
import OrderSuccessPage from './pages/OrderConfirmationPage';
import CustomersPage from './pages/admin/CustomersPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
      // <CartProvider>
      <Router>
          <ToastContainer position="top-center" />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin/*" element={
              <AdminRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="categories" element={<AdminCategoriesPage />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="products/new" element={<ProductCreatePage />} />
                    <Route path="products/edit/:id" element={<ProductCreatePage />} />
                    <Route path="categories/new" element={<CategoryFormPage />} />
                    <Route path="categories/edit/:id" element={<CategoryFormPage />} />
                    <Route path="customers" element={<CustomersPage />} />                    
                  </Routes>
                </AdminLayout>
              </AdminRoute>
            } />
            
            {/* Customer Routes */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:_id" element={<ProductDetailPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/category/:_id" element={<CategoryPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/orders" element={<OrderHistoryPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/deals" element={<DealsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      // </CartProvider>
  );
}

export default App;