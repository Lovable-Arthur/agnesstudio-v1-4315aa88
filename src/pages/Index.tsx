
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
}

const Index = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceBook = (service: Service) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsBookingModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection onServiceBook={handleServiceBook} />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
      />

      {/* Links para outras páginas */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <div>
          <button 
            onClick={() => window.location.href = '/agenda'}
            className="block w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
          >
            📅 Agenda
          </button>
        </div>
        <div>
          <button 
            onClick={() => window.location.href = '/comissoes'}
            className="block w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-lg hover:bg-secondary/90 transition-colors"
          >
            💰 Comissões
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
