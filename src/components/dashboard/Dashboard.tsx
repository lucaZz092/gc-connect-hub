import { Users, Calendar, UserCheck, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardProps {
  userRole: string;
}

export function Dashboard({ userRole }: DashboardProps) {
  // Mock data - in a real app, this would come from an API
  const getMockStats = () => {
    if (userRole === "secretary" || userRole === "leader") {
      return [
        { title: "Membros Ativos", value: 15, icon: Users, description: "Membros do seu GC", trend: { value: 12, isPositive: true } },
        { title: "Presença Média", value: "85%", icon: UserCheck, description: "Últimas 4 semanas", trend: { value: 5, isPositive: true } },
        { title: "Encontros Realizados", value: 8, icon: Calendar, description: "Este mês" },
        { title: "Visitantes", value: 3, icon: TrendingUp, description: "Novas pessoas", trend: { value: 50, isPositive: true } }
      ];
    } else if (userRole === "coordinator") {
      return [
        { title: "GCs Coordenados", value: 6, icon: Users, description: "Grupos sob sua coordenação" },
        { title: "Total de Membros", value: 87, icon: UserCheck, description: "Todos os GCs", trend: { value: 8, isPositive: true } },
        { title: "Presença Média", value: "78%", icon: Calendar, description: "Últimas 4 semanas", trend: { value: 3, isPositive: true } },
        { title: "Crescimento", value: "12%", icon: TrendingUp, description: "Este trimestre", trend: { value: 12, isPositive: true } }
      ];
    } else {
      return [
        { title: "Total de GCs", value: 24, icon: Users, description: "Grupos ativos" },
        { title: "Total de Membros", value: 312, icon: UserCheck, description: "Membros ativos", trend: { value: 15, isPositive: true } },
        { title: "Presença Média", value: "82%", icon: Calendar, description: "Últimas 4 semanas", trend: { value: 7, isPositive: true } },
        { title: "Crescimento Anual", value: "28%", icon: TrendingUp, description: "Comparado ao ano anterior", trend: { value: 28, isPositive: true } }
      ];
    }
  };

  const stats = getMockStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Visão geral dos seus grupos de células
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-0 shadow-card">
          <CardHeader>
            <CardTitle>Presença nas Últimas Semanas</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Gráfico de presença será implementado aqui
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-0 shadow-card">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Encontro registrado - GC Esperança
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2 horas atrás
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Novo membro adicionado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    5 horas atrás
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Membro ausente há 3 semanas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    1 dia atrás
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}