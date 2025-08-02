import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PhotoGallery } from "@/components/PhotoGallery";
import { openGoogleMaps, openWaze } from "@/utils/mapsIntegration";
import type { LocationData } from "@/hooks/useGeolocation";
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Navigation, 
  Star, 
  Heart,
  Camera,
  Info,
  Activity,
  DollarSign,
  Map,
  Phone,
  Navigation2,
  Compass
} from "lucide-react";

interface AttractionDetailProps {
  attraction: {
    name: string;
    image: string;
    photos: string[];
    duration: string;
    activities: string[];
    difficulty: "Fácil" | "Moderado" | "Difícil";
    rating: number;
    description: string;
    distance: string;
    coordinates: string;
    fullDescription: string;
    curiosities: string[];
    tips: string[];
    price: string;
  };
  onBack: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  onNavigate?: () => void;
  userLocation?: LocationData | null;
}

export const AttractionDetail = ({ 
  attraction, 
  onBack, 
  onToggleFavorite, 
  isFavorite,
  onNavigate,
  userLocation
}: AttractionDetailProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  const handleNavigate = () => {
    if (onNavigate) {
      onNavigate();
    } else {
      // Fallback to old method
      openGoogleMaps(attraction.coordinates, attraction.name);
    }
  };

  const handleWazeNavigation = () => {
    openWaze(attraction.coordinates);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Fácil": return "bg-secondary text-secondary-foreground";
      case "Moderado": return "bg-accent text-accent-foreground";
      case "Difícil": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Photo Gallery */}
      <PhotoGallery 
        photos={attraction.photos}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Header Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={attraction.image} 
          alt={attraction.name}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsGalleryOpen(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button
            variant="secondary"
            size="icon"
            onClick={onBack}
            className="bg-white/90 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsGalleryOpen(true)}
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Camera className="h-5 w-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={onToggleFavorite}
              className={`bg-white/90 backdrop-blur-sm hover:bg-white ${isFavorite ? 'text-red-500' : ''}`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Title & Rating */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-medium text-foreground">{attraction.rating}</span>
            </div>
            <Badge className={getDifficultyColor(attraction.difficulty)}>
              {attraction.difficulty}
            </Badge>
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">{attraction.price}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">{attraction.name}</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Info */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Duração</span>
            </div>
            <p className="font-semibold">{attraction.duration}</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Distância</span>
            </div>
            <p className="font-semibold">{attraction.distance}</p>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleNavigate}
            className="bg-gradient-primary hover:opacity-90 text-white font-semibold py-3"
            size="lg"
          >
            <Map className="h-5 w-5 mr-2" />
            Google Maps
          </Button>
          <Button 
            onClick={handleWazeNavigation}
            className="bg-gradient-nature hover:opacity-90 text-white font-semibold py-3"
            size="lg"
          >
            <Navigation className="h-5 w-5 mr-2" />
            Waze
          </Button>
        </div>

        {/* Description */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Sobre o Local</h3>
          </div>
          <p className="text-muted-foreground">{attraction.fullDescription}</p>
        </Card>

        {/* Activities */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Atividades</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {attraction.activities.map((activity, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {activity}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Curiosities */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Curiosidades</h3>
          </div>
          <ul className="space-y-2">
            {attraction.curiosities.map((curiosity, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                {curiosity}
              </li>
            ))}
          </ul>
        </Card>

        {/* Tips */}
        {attraction.tips.length > 0 && (
          <Card className="p-4 bg-accent/10 border-accent">
            <h3 className="font-semibold mb-3 text-accent-foreground">Dicas Importantes</h3>
            <ul className="space-y-2">
              {attraction.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>
        )}

        <Separator />

        <div className="text-center text-sm text-muted-foreground">
          <p>Coordenadas: {attraction.coordinates}</p>
        </div>
      </div>
    </div>
  );
};