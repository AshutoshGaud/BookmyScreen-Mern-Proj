import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { LocationProvider } from './context/LocationContext.jsx';
import { SeatProvider } from './context/SeatContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // ✅ ADD THIS
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <SeatProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SeatProvider>
        </LocationProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);