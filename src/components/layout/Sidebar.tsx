import { Home, Users, Calendar, BarChart3, Settings, PlusCircle, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: string;
}

export function Sidebar({ activeTab, onTabChange, userRole }: SidebarProps) {
  const getMenuItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "meetings", label: "Encontros", icon: Calendar }
    ];

    if (userRole === "secretary" || userRole === "leader") {
      baseItems.push(
        { id: "members", label: "Membros", icon: Users },
        { id: "register-meeting", label: "Registrar Encontro", icon: PlusCircle }
      );
    }

    if (userRole === "coordinator" || userRole === "pastor") {
      baseItems.push(
        { id: "gcs", label: "Grupos de Células", icon: Users },
        { id: "reports", label: "Relatórios", icon: BarChart3 }
      );
    }

    if (userRole === "pastor") {
      baseItems.push(
        { id: "users", label: "Usuários", icon: UserCheck }
      );
    }

    baseItems.push({ id: "settings", label: "Configurações", icon: Settings });

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 bg-card border-r border-border h-screen">
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeTab === item.id && "bg-primary text-primary-foreground shadow-md"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}