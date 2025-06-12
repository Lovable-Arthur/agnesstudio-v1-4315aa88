
import React, { useState } from 'react';
import { Menu, X, Calendar, Users, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Agnes Studio
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-primary transition-colors">
              Início
            </a>
            <a href="#servicos" className="text-gray-700 hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-primary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-gray-700 hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">
                <LogIn className="mr-2 h-4 w-4" />
                Colaboradores
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#inicio" className="block px-3 py-2 text-gray-700 hover:text-primary">
              Início
            </a>
            <a href="#servicos" className="block px-3 py-2 text-gray-700 hover:text-primary">
              Serviços
            </a>
            <a href="#sobre" className="block px-3 py-2 text-gray-700 hover:text-primary">
              Sobre
            </a>
            <a href="#contato" className="block px-3 py-2 text-gray-700 hover:text-primary">
              Contato
            </a>
            <div className="flex flex-col space-y-2 px-3 pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Colaboradores
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
