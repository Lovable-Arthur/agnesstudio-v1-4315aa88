
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

  const handleBookingOpen = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onBookingOpen={handleBookingOpen} />
      <ServicesSection onServiceBook={handleServiceBook} />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseModal}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Index;
