
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { OrderProvider } from "./context/OrderContext";
import { EcoCoinProvider } from "./context/EcoCoinContext";
import Index from "./pages/Index";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import SellItem from "./pages/SellItem";
import ProductDetail from "./pages/ProductDetail";
import CategoryDetail from "./pages/CategoryDetail";
import FlightBooking from "./pages/FlightBooking";
import Account from "./pages/Account";
import AccountOrders from "./pages/AccountOrders";
import ConcertTickets from "./pages/ConcertTickets";
import RefundCenter from "./pages/RefundCenter"; // New refund center page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <OrderProvider>
            <EcoCoinProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/connect" element={<Connect />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:categoryId" element={<CategoryDetail />} />
                  <Route path="/sell" element={<SellItem />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/flights" element={<FlightBooking />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/account/orders" element={<AccountOrders />} />
                  <Route path="/concerts" element={<ConcertTickets />} />
                  <Route path="/refund" element={<RefundCenter />} /> {/* New refund route */}
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </EcoCoinProvider>
          </OrderProvider>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
