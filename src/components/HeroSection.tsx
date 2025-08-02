import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Thermometer } from "lucide-react";
// Using online image URL instead of local asset

interface HeroSectionProps {
  onExplore: () => void;
}

export const HeroSection = ({ onExplore }: HeroSectionProps) => {
  return (
    <div className="relative h-96 overflow-hidden rounded-2xl mx-4 my-6 shadow-auto">
      <img 
        src="https://images.unsplash.com/photo-1539650116574-75c0c6d68370" 
        alt="Bonito MS - Águas Cristalinas" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
            <MapPin className="h-3 w-3 mr-1" />
            Mato Grosso do Sul
          </Badge>
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
            <Thermometer className="h-3 w-3 mr-1" />
            26°C
          </Badge>
          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
            <Clock className="h-3 w-3 mr-1" />
            Tempo Bom
          </Badge>
        </div>
        
        <h2 className="text-3xl font-bold mb-2 animate-float">
          Descubra Bonito
        </h2>
        <p className="text-lg text-white/90 mb-4 max-w-md">
          O destino das águas cristalinas e natureza exuberante do Brasil
        </p>
        
        <Button 
          onClick={onExplore}
          size="lg"
          className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-8 animate-glow"
        >
          Explorar Atrativos
        </Button>
      </div>
      
      {/* Animated Elements */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="w-3 h-3 bg-white/40 rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse delay-100" />
        <div className="w-4 h-4 bg-white/20 rounded-full animate-pulse delay-200" />
      </div>
    </div>
  );
};