import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TourProvider } from "./contexts/TourContext";
import { BlogProvider } from "./contexts/BlogContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { BookingProvider } from "./contexts/BookingContext";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Booking from "./pages/Booking";
import BlogSubmission from "./pages/BlogSubmission";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import TourManagement from "./pages/admin/TourManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import AdminSettings from "./pages/admin/AdminSettings";
import NewTour from "./pages/admin/NewTour";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SettingsProvider>
      <BookingProvider>
        <TourProvider>
          <BlogProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/tours" element={<Tours />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/booking" element={<Booking />} />
                  <Route path="/blog/submit" element={<BlogSubmission />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="tours" element={<TourManagement />} />
                    <Route path="tours/new" element={<NewTour />} />
                    <Route path="blogs" element={<BlogManagement />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </BlogProvider>
        </TourProvider>
      </BookingProvider>
    </SettingsProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
