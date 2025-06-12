
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credenciais fixas para demonstração
    if (email === 'admin@admin.com' && password === 'admin') {
      onLogin();
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao espaço dos colaboradores.",
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-black rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Espaço dos Colaboradores</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail:</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha:</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <a href="#" className="text-cyan-500 hover:text-cyan-600 text-sm">
              Esqueci minha senha
            </a>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Para demonstração:</p>
            <p>Email: admin@admin.com</p>
            <p>Senha: admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
