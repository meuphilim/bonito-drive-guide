import { useState } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PWABannerProps {
  onInstall: () => Promise<boolean>;
}

export const PWABanner = ({ onInstall }: PWABannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isVisible) return null;

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      const success = await onInstall();
      if (success) {
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Remember user dismissed for this session
    sessionStorage.setItem('pwa-banner-dismissed', 'true');
  };

  return (
    <Card className="fixed top-4 left-4 right-4 z-50 p-4 bg-primary text-primary-foreground shadow-lg border-0 max-w-md mx-auto">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Smartphone className="h-6 w-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">
            Instalar Bonito Guide
          </h4>
          <p className="text-xs text-primary-foreground/90 mb-3">
            Instale nosso app para usar offline e ter acesso rápido aos atrativos turísticos
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleInstall}
              disabled={isInstalling}
              className="text-xs h-8"
            >
              <Download className="h-3 w-3 mr-1" />
              {isInstalling ? 'Instalando...' : 'Instalar'}
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="text-xs h-8 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Não agora
            </Button>
          </div>
        </div>
        
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDismiss}
          className="flex-shrink-0 h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};