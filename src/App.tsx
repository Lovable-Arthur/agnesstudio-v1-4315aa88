import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfessionalsProvider } from "@/contexts/ProfessionalsContext";
import { ServicesProvider } from "@/contexts/ServicesContext";
import { ClientsProvider } from "@/contexts/ClientsContext";
import { ProductsProvider } from "@/contexts/ProductsContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Schedule from "./pages/Schedule";
import Commissions from "./pages/Commissions";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ProfessionalsProvider>
            <ServicesProvider>
              <ProductsProvider>
                <ClientsProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route 
                      path="/agenda" 
                      element={
                        <ProtectedRoute>
                          <Schedule />
                        </ProtectedRoute>
                      } 
                    />
                    <Route 
                      path="/comissoes" 
                      element={
                        <ProtectedRoute>
                          <Commissions />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ClientsProvider>
              </ProductsProvider>
            </ServicesProvider>
          </ProfessionalsProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
