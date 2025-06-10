
const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">B</span>
          </div>
          <h4 className="text-xl font-bold">Beleza Salon</h4>
        </div>
        <p className="text-primary-foreground/80">
          © 2024 Beleza Salon. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
