import { Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface OfflineIndicatorProps {
  isOnline: boolean;
}

export const OfflineIndicator = ({ isOnline }: OfflineIndicatorProps) => {
  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <Badge 
        variant="destructive" 
        className="flex items-center gap-2 px-3 py-1 text-xs font-medium shadow-lg"
      >
        <WifiOff className="h-3 w-3" />
        Modo Offline
      </Badge>
    </div>
  );
};