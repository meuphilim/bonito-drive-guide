import { useState, useEffect } from "react";
import { AutoHeader } from "@/components/AutoHeader";
import { HeroSection } from "@/components/HeroSection";
import { QuickActions } from "@/components/QuickActions";
import { AttractionCard } from "@/components/AttractionCard";
import { AttractionDetail } from "@/components/AttractionDetail";
import { attractions, type Attraction } from "@/data/attractions";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "detail">("home");
  const [filteredAttractions, setFilteredAttractions] = useState(attractions);

  useEffect(() => {
    // Auto detect system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleMenuOpen = () => {
    toast({
      title: "Menu",
      description: "Funcionalidade em desenvolvimento para Android Auto",
    });
  };

  const handleAttractionClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
    setCurrentView("detail");
  };

  const handleBackToHome = () => {
    setSelectedAttraction(null);
    setCurrentView("home");
  };

  const handleNavigate = () => {
    if (selectedAttraction) {
      toast({
        title: "Navegando para " + selectedAttraction.name,
        description: "Abrindo no GPS do veículo...",
      });
    }
  };

  const handleToggleFavorite = () => {
    if (selectedAttraction) {
      const isFavorite = favorites.includes(selectedAttraction.id);
      if (isFavorite) {
        setFavorites(favorites.filter(id => id !== selectedAttraction.id));
        toast({
          title: "Removido dos favoritos",
          description: selectedAttraction.name,
        });
      } else {
        setFavorites([...favorites, selectedAttraction.id]);
        toast({
          title: "Adicionado aos favoritos",
          description: selectedAttraction.name,
        });
      }
    }
  };

  const handleShowFavorites = () => {
    const favoriteAttractions = attractions.filter(a => favorites.includes(a.id));
    setFilteredAttractions(favoriteAttractions);
    toast({
      title: "Favoritos",
      description: `${favoriteAttractions.length} atrativos encontrados`,
    });
  };

  const handleShowNearby = () => {
    // Simulate nearby logic - in real app would use GPS
    setFilteredAttractions(attractions.slice(0, 3));
    toast({
      title: "Atrativos Próximos",
      description: "Baseado na sua localização atual",
    });
  };

  const handleShowRecommended = () => {
    const recommended = attractions.filter(a => a.rating >= 4.7);
    setFilteredAttractions(recommended);
    toast({
      title: "Recomendados",
      description: `${recommended.length} atrativos com melhor avaliação`,
    });
  };

  const handleShowFilters = () => {
    toast({
      title: "Filtros",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleExplore = () => {
    setFilteredAttractions(attractions);
    // Smooth scroll to attractions section
    setTimeout(() => {
      const element = document.getElementById('attractions-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (currentView === "detail" && selectedAttraction) {
    return (
      <AttractionDetail
        attraction={selectedAttraction}
        onBack={handleBackToHome}
        onNavigate={handleNavigate}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={favorites.includes(selectedAttraction.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AutoHeader 
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        onMenuOpen={handleMenuOpen}
      />
      
      <HeroSection onExplore={handleExplore} />
      
      <QuickActions
        onFavorites={handleShowFavorites}
        onNearby={handleShowNearby}
        onRecommended={handleShowRecommended}
        onFilters={handleShowFilters}
      />
      
      <div id="attractions-section" className="px-4 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-xl text-foreground">
            Atrativos Turísticos
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredAttractions.length} locais
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              {...attraction}
              onClick={() => handleAttractionClick(attraction)}
            />
          ))}
        </div>
        
        {filteredAttractions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum atrativo encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
