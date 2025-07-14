import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Save, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RegisterMeeting() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    membersPresent: "",
    visitors: "",
    children: "",
    observations: ""
  });

  // Mock members data
  const members = [
    { id: 1, name: "João Silva", present: true },
    { id: 2, name: "Maria Santos", present: true },
    { id: 3, name: "Pedro Oliveira", present: false },
    { id: 4, name: "Ana Costa", present: true },
    { id: 5, name: "Carlos Ferreira", present: true },
    { id: 6, name: "Lucia Mendes", present: false },
  ];

  const [memberPresence, setMemberPresence] = useState(
    members.reduce((acc, member) => {
      acc[member.id] = member.present;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const presentCount = Object.values(memberPresence).filter(Boolean).length;
    
    toast({
      title: "Encontro registrado com sucesso!",
      description: `${presentCount} membros presentes registrados.`,
    });

    // Reset form
    setFormData({
      date: "",
      membersPresent: "",
      visitors: "",
      children: "",
      observations: ""
    });
  };

  const toggleMemberPresence = (memberId: number) => {
    setMemberPresence(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  const presentCount = Object.values(memberPresence).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Registrar Encontro</h2>
        <p className="text-muted-foreground">
          Registre a presença e detalhes do encontro semanal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Informações do Encontro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data do Encontro</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="visitors">Visitantes</Label>
                  <Input
                    id="visitors"
                    type="number"
                    min="0"
                    value={formData.visitors}
                    onChange={(e) => setFormData(prev => ({ ...prev, visitors: e.target.value }))}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="children">Crianças</Label>
                  <Input
                    id="children"
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) => setFormData(prev => ({ ...prev, children: e.target.value }))}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Membros Presentes</Label>
                  <div className="text-2xl font-bold text-primary">
                    {presentCount}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observations">Observações</Label>
                <Textarea
                  id="observations"
                  value={formData.observations}
                  onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                  placeholder="Ex: Fulano está doente, precisa de oração..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Lista de Presença
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={memberPresence[member.id]}
                      onCheckedChange={() => toggleMemberPresence(member.id)}
                    />
                    <Label
                      htmlFor={`member-${member.id}`}
                      className={`flex-1 cursor-pointer ${
                        memberPresence[member.id] ? 'text-foreground' : 'text-muted-foreground line-through'
                      }`}
                    >
                      {member.name}
                    </Label>
                    <div className={`w-2 h-2 rounded-full ${
                      memberPresence[member.id] ? 'bg-success' : 'bg-muted'
                    }`} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Salvar Encontro
          </Button>
        </div>
      </form>
    </div>
  );
}