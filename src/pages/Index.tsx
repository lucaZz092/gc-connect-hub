import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { RegisterMeeting } from "@/components/meetings/RegisterMeeting";
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (email: string, role: string, name: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard userRole={userRole} />;
      case "register-meeting":
        return <RegisterMeeting />;
      case "meetings":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Encontros</h2>
            <p className="text-muted-foreground">Lista de encontros realizados será implementada aqui</p>
          </div>
        );
      case "members":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Membros</h2>
            <p className="text-muted-foreground">Gestão de membros será implementada aqui</p>
          </div>
        );
      case "gcs":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Grupos de Crescimento</h2>
            <p className="text-muted-foreground">Gestão de GCs será implementada aqui</p>
          </div>
        );
      case "reports":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
            <p className="text-muted-foreground">Relatórios detalhados serão implementados aqui</p>
          </div>
        );
      case "users":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Usuários</h2>
            <p className="text-muted-foreground">Gestão de usuários será implementada aqui</p>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
            <p className="text-muted-foreground">Configurações do sistema serão implementadas aqui</p>
          </div>
        );
      default:
        return <Dashboard userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header userRole={userRole} userName={userName} />
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          userRole={userRole} 
        />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
