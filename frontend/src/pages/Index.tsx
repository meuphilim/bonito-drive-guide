import { useState, useEffect, useCallback } from "react";
import { AutoHeader } from "@/components/AutoHeader";
import { HeroSection } from "@/components/HeroSection";
import { QuickActions } from "@/components/QuickActions";
import { AttractionCard } from "@/components/AttractionCard";
import { AttractionDetail } from "@/components/AttractionDetail";
import { PWABanner } from "@/components/PWABanner";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { VoiceControl } from "@/components/VoiceControl";
import { attractions as fallbackAttractions, type Attraction } from "@/data/attractions";
import { toast } from "@/hooks/use-toast";
import { usePWA } from "@/hooks/usePWA";
import { useVoiceControl, type VoiceCommand } from "@/hooks/useVoiceControl";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useAttractions } from "@/hooks/useAttractions";

const Index = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"home" | "detail">("home");
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>([]);

  // PWA hooks
  const pwa = usePWA();
  const geolocation = useGeolocation();
  const attractionsAPI = useAttractions();

  useEffect(() => {
    // Force dark mode for automotive experience
    document.documentElement.classList.add('dark');
    
    // Load favorites from localStorage
    const savedFavorites = attractionsAPI.getFavorites();
    setFavorites(savedFavorites);

    // Set initial attractions data (from API or fallback)
    if (attractionsAPI.attractions.length > 0) {
      setFilteredAttractions(attractionsAPI.attractions);
    } else {
      // Use fallback data while API loads
      setFilteredAttractions(fallbackAttractions);
    }

    // Get user location on startup
    if (geolocation.isSupported) {
      geolocation.getCurrentPosition();
    }

    // Load additional data
    attractionsAPI.fetchStats();
    attractionsAPI.fetchCategories();
  }, []);

  // Update filtered attractions when API data changes
  useEffect(() => {
    if (attractionsAPI.attractions.length > 0) {
      setFilteredAttractions(attractionsAPI.attractions);
    }
  }, [attractionsAPI.attractions]);

  // Voice commands - Enhanced for better interaction
  const voiceCommands: VoiceCommand[] = [
    {
      command: "início",
      action: () => {
        handleBackToHome();
        voiceControl.speak("Voltando para a tela inicial");
      },
      description: "Voltar para tela inicial"
    },
    {
      command: "voltar",
      action: () => {
        handleBackToHome();
        voiceControl.speak("Voltando para a tela inicial");
      },
      description: "Voltar para tela inicial"
    },
    {
      command: "favoritos",
      action: () => {
        handleShowFavorites();
        voiceControl.speak(`Mostrando ${favorites.length} atrativos favoritos`);
      },
      description: "Mostrar atrativos favoritos"
    },
    {
      command: "próximos",
      action: () => {
        handleShowNearby();
        voiceControl.speak("Procurando atrativos próximos à sua localização");
      },
      description: "Mostrar atrativos próximos"
    },
    {
      command: "perto de mim",
      action: () => {
        handleShowNearby();
        voiceControl.speak("Procurando atrativos perto de você");
      },
      description: "Mostrar atrativos próximos"
    },
    {
      command: "recomendados",
      action: () => {
        handleShowRecommended();
        voiceControl.speak("Mostrando os atrativos mais bem avaliados");
      },
      description: "Mostrar atrativos recomendados"
    },
    {
      command: "navegar",
      action: () => {
        if (selectedAttraction) {
          handleNavigateWithGPS();
          voiceControl.speak(`Abrindo navegação para ${selectedAttraction.name}`);
        } else {
          voiceControl.speak("Por favor, selecione um atrativo primeiro para navegar");
        }
      },
      description: "Navegar para atrativo selecionado"
    },
    {
      command: "ir para",
      action: () => {
        if (selectedAttraction) {
          handleNavigateWithGPS();
          voiceControl.speak(`Calculando rota para ${selectedAttraction.name}`);
        } else {
          voiceControl.speak("Selecione um atrativo na tela para calcular a rota");
        }
      },
      description: "Navegar para atrativo selecionado"
    },
    {
      command: "gruta lago azul",
      action: () => {
        const gruta = filteredAttractions.find(a => a.id === 'gruta-lago-azul');
        if (gruta) {
          handleAttractionClick(gruta);
          voiceControl.speak(`Abrindo informações da Gruta do Lago Azul. Um dos cartões postais de Bonito`);
        } else {
          voiceControl.speak("Gruta do Lago Azul não encontrada na lista atual");
        }
      },
      description: "Abrir Gruta do Lago Azul"
    },
    {
      command: "rio da prata",
      action: () => {
        const rio = filteredAttractions.find(a => a.id === 'rio-da-prata');
        if (rio) {
          handleAttractionClick(rio);
          voiceControl.speak(`Abrindo informações do Rio da Prata. Ideal para flutuação`);
        } else {
          voiceControl.speak("Rio da Prata não encontrado na lista atual");
        }
      },
      description: "Abrir Rio da Prata"
    },
    {
      command: "abismo anhumas",
      action: () => {
        const abismo = filteredAttractions.find(a => a.id === 'abismo-anhumas');
        if (abismo) {
          handleAttractionClick(abismo);
          voiceControl.speak(`Abrindo informações do Abismo Anhumas. Aventura com rapel de 72 metros`);
        } else {
          voiceControl.speak("Abismo Anhumas não encontrado na lista atual");
        }
      },
      description: "Abrir Abismo Anhumas"
    },
    {
      command: "grutas",
      action: () => {
        attractionsAPI.fetchAttractions({ category: 'Gruta' });
        voiceControl.speak("Mostrando todas as grutas de Bonito");
      },
      description: "Filtrar por grutas"
    },
    {
      command: "rios",
      action: () => {
        attractionsAPI.fetchAttractions({ category: 'Rio' });
        voiceControl.speak("Mostrando todos os rios para flutuação");
      },
      description: "Filtrar por rios"
    },
    {
      command: "cachoeiras",
      action: () => {
        attractionsAPI.fetchAttractions({ category: 'Cachoeira' });
        voiceControl.speak("Mostrando todas as cachoeiras");
      },
      description: "Filtrar por cachoeiras"
    },
    {
      command: "aventura",
      action: () => {
        attractionsAPI.fetchAttractions({ category: 'Aventura' });
        voiceControl.speak("Mostrando atividades de aventura");
      },
      description: "Filtrar por aventura"
    },
    {
      command: "todos atrativos",
      action: () => {
        handleExplore();
        voiceControl.speak(`Mostrando todos os ${filteredAttractions.length} atrativos disponíveis`);
      },
      description: "Mostrar todos os atrativos"
    },
    {
      command: "ajuda",
      action: () => {
        voiceControl.speak("Você pode dizer: favoritos, próximos, recomendados, navegar, grutas, rios, cachoeiras, ou o nome de um atrativo específico. Diga voltar para a tela inicial");
      },
      description: "Mostrar comandos disponíveis"
    },
    {
      command: "comandos",
      action: () => {
        voiceControl.speak("Comandos disponíveis: diga favoritos para ver seus favoritos, próximos para atrativos perto de você, recomendados para os melhores, ou o nome de qualquer atrativo");
      },
      description: "Mostrar comandos disponíveis"
    }
  ];

  const voiceControl = useVoiceControl(voiceCommands);

  const handleMenuOpen = () => {
    toast({
      title: "Menu",
      description: "Use comandos de voz ou toque para navegar",
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

  const handleNavigateWithGPS = useCallback(() => {
    if (!selectedAttraction) {
      toast({
        title: "Erro",
        description: "Selecione um atrativo primeiro",
        variant: "destructive"
      });
      return;
    }

    const coordinates = geolocation.parseCoordinates(selectedAttraction.coordinates);
    if (!coordinates) {
      toast({
        title: "Erro",
        description: "Coordenadas inválidas para este atrativo",
        variant: "destructive"
      });
      return;
    }

    if (!geolocation.location) {
      toast({
        title: "Obtendo localização...",
        description: "Aguarde enquanto obtemos sua localização atual"
      });
      geolocation.getCurrentPosition();
      return;
    }

    geolocation.openNavigation(coordinates, selectedAttraction.name);
    
    toast({
      title: "Navegando para " + selectedAttraction.name,
      description: "Abrindo no aplicativo de navegação do dispositivo",
    });
  }, [selectedAttraction, geolocation]);

  const handleNavigate = () => {
    handleNavigateWithGPS();
  };

  const handleToggleFavorite = () => {
    if (selectedAttraction) {
      const isFavorite = favorites.includes(selectedAttraction.id);
      if (isFavorite) {
        attractionsAPI.removeFromFavorites(selectedAttraction.id);
        setFavorites(favorites.filter(id => id !== selectedAttraction.id));
        toast({
          title: "Removido dos favoritos",
          description: selectedAttraction.name,
        });
      } else {
        attractionsAPI.addToFavorites(selectedAttraction.id);
        setFavorites([...favorites, selectedAttraction.id]);
        toast({
          title: "Adicionado aos favoritos",
          description: selectedAttraction.name,
        });
      }
    }
  };

  const handleShowFavorites = () => {
    const currentAttractions = attractionsAPI.attractions.length > 0 ? attractionsAPI.attractions : fallbackAttractions;
    const favoriteAttractions = currentAttractions.filter(a => favorites.includes(a.id));
    setFilteredAttractions(favoriteAttractions);
    toast({
      title: "Favoritos",
      description: `${favoriteAttractions.length} atrativos encontrados`,
    });
  };

  const handleShowNearby = () => {
    if (!geolocation.location) {
      toast({
        title: "Localização necessária",
        description: "Permita acesso à localização para ver atrativos próximos",
      });
      geolocation.getCurrentPosition();
      return;
    }

    // Use API nearby endpoint if available
    if (attractionsAPI.attractions.length > 0) {
      attractionsAPI.fetchNearbyAttractions(
        geolocation.location.coords.latitude,
        geolocation.location.coords.longitude
      );
      toast({
        title: "Atrativos Próximos",
        description: "Carregando atrativos próximos à sua localização",
      });
    } else {
      // Fallback to local calculation
      const currentAttractions = fallbackAttractions;
      const attractionsWithDistance = currentAttractions.map(attraction => {
        const coords = geolocation.parseCoordinates(attraction.coordinates);
        if (coords && geolocation.location) {
          const distance = geolocation.calculateDistance(geolocation.location.coords, coords);
          return { ...attraction, distance };
        }
        return { ...attraction, distance: Infinity };
      });

      const nearbyAttractions = attractionsWithDistance
        .filter(a => a.distance !== Infinity)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5);

      setFilteredAttractions(nearbyAttractions);
      toast({
        title: "Atrativos Próximos",
        description: `${nearbyAttractions.length} atrativos encontrados`,
      });
    }
  };

  const handleShowRecommended = () => {
    const currentAttractions = attractionsAPI.attractions.length > 0 ? attractionsAPI.attractions : fallbackAttractions;
    const recommended = currentAttractions.filter(a => a.rating >= 4.7);
    setFilteredAttractions(recommended);
    toast({
      title: "Recomendados",
      description: `${recommended.length} atrativos com melhor avaliação`,
    });
  };

  const handleShowFilters = () => {
    toast({
      title: "Filtros",
      description: "Use os comandos de voz ou botões de ação rápida",
    });
  };

  const handleExplore = () => {
    const currentAttractions = attractionsAPI.attractions.length > 0 ? attractionsAPI.attractions : fallbackAttractions;
    setFilteredAttractions(currentAttractions);
    // Smooth scroll to attractions section
    setTimeout(() => {
      const element = document.getElementById('attractions-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (currentView === "detail" && selectedAttraction) {
    return (
      <>
        <OfflineIndicator isOnline={pwa.isOnline} />
        <VoiceControl 
          isSupported={voiceControl.isSupported}
          isListening={voiceControl.isListening}
          transcript={voiceControl.transcript}
          onToggleListening={voiceControl.toggleListening}
          commands={voiceCommands}
        />
        <AttractionDetail
          attraction={selectedAttraction}
          onBack={handleBackToHome}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.includes(selectedAttraction.id)}
          onNavigate={handleNavigateWithGPS}
          userLocation={geolocation.location}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* PWA Components */}
      {pwa.isInstallable && <PWABanner onInstall={pwa.installPWA} />}
      <OfflineIndicator isOnline={pwa.isOnline} />
      <VoiceControl 
        isSupported={voiceControl.isSupported}
        isListening={voiceControl.isListening}
        transcript={voiceControl.transcript}
        onToggleListening={voiceControl.toggleListening}
        commands={voiceCommands}
      />
      
      <AutoHeader 
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
            {geolocation.location && " • GPS ativo"}
            {attractionsAPI.loading && " • Carregando..."}
            {attractionsAPI.error && " • Offline"}
          </span>
        </div>
        
        {attractionsAPI.loading && filteredAttractions.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando atrativos turísticos...</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAttractions.map((attraction: any) => {
            // Calculate distance if location available
            let distance = null;
            if (geolocation.location) {
              const coords = geolocation.parseCoordinates(attraction.coordinates);
              if (coords) {
                distance = geolocation.calculateDistance(geolocation.location.coords, coords);
              }
            }

            return (
              <AttractionCard
                key={attraction.id}
                {...attraction}
                onClick={() => handleAttractionClick(attraction)}
                distance={distance ? geolocation.formatDistance(distance) : attraction.distance}
              />
            );
          })}
        </div>
        
        {filteredAttractions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum atrativo encontrado</p>
            {!pwa.isOnline && (
              <p className="text-sm text-muted-foreground mt-2">
                Conecte-se à internet para ver mais atrativos
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
