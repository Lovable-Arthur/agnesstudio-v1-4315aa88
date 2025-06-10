
import { useState } from "react";
import BookingModal from "@/components/BookingModal";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection, { services } from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const handleBookService = (service: typeof services[0]) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onBookingOpen={() => setIsBookingOpen(true)} />
      <HeroSection onBookingOpen={() => setIsBookingOpen(true)} />
      <ServicesSection onServiceBook={handleBookService} />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Index;
