import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Star, 
  Clock, 
  Filter, 
  Navigation,
  Heart,
  Camera,
  Info
} from "lucide-react";

interface QuickActionsProps {
  onFavorites: () => void;
  onNearby: () => void;
  onRecommended: () => void;
  onFilters: () => void;
}

export const QuickActions = ({ 
  onFavorites, 
  onNearby, 
  onRecommended, 
  onFilters 
}: QuickActionsProps) => {
  const actions = [
    {
      icon: Star,
      label: "Recomendados",
      color: "text-accent",
      bgColor: "bg-accent/10",
      onClick: onRecommended
    },
    {
      icon: MapPin,
      label: "Próximos",
      color: "text-primary",
      bgColor: "bg-primary/10",
      onClick: onNearby
    },
    {
      icon: Heart,
      label: "Favoritos",
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950",
      onClick: onFavorites
    },
    {
      icon: Filter,
      label: "Filtros",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      onClick: onFilters
    }
  ];

  return (
    <div className="px-4 mb-6">
      <h3 className="font-semibold text-lg mb-4 text-foreground">Acesso Rápido</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Card 
            key={index}
            className="p-4 cursor-pointer hover:shadow-card transition-all duration-200 transform hover:scale-105 group"
            onClick={action.onClick}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={`${action.bgColor} ${action.color} p-3 rounded-full group-hover:scale-110 transition-transform`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-card-foreground">{action.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};