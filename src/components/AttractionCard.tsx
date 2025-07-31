import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Camera, Star } from "lucide-react";

interface AttractionCardProps {
  name: string;
  image: string;
  duration: string;
  activities: string[];
  difficulty: "Fácil" | "Moderado" | "Difícil";
  rating: number;
  description: string;
  distance: string;
  coordinates: string;
  onClick: () => void;
}

export const AttractionCard = ({
  name,
  image,
  duration,
  activities,
  difficulty,
  rating,
  description,
  distance,
  onClick
}: AttractionCardProps) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Fácil": return "bg-secondary text-secondary-foreground";
      case "Moderado": return "bg-accent text-accent-foreground";
      case "Difícil": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card 
      className="group overflow-hidden shadow-card hover:shadow-auto transition-all duration-300 cursor-pointer transform hover:scale-[1.02] bg-card"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
          <Camera className="h-4 w-4 text-primary" />
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-foreground">{rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg text-card-foreground line-clamp-2">{name}</h3>
          <Badge className={getDifficultyColor(difficulty)} variant="secondary">
            {difficulty}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{distance}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {activities.slice(0, 3).map((activity, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {activity}
            </Badge>
          ))}
          {activities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{activities.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};