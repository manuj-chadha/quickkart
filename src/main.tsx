import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store.ts';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { CartProvider } from './context/CartContext.tsx';

const persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </CartProvider>
  </StrictMode>

);
