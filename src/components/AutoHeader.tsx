import { MapPin, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AutoHeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onMenuOpen: () => void;
}

export const AutoHeader = ({ isDark, onToggleTheme, onMenuOpen }: AutoHeaderProps) => {
  return (
    <header className="bg-gradient-primary shadow-auto px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuOpen}
            className="text-primary-foreground hover:bg-white/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">Bonito Drive</h1>
              <p className="text-sm text-primary-foreground/80">Mato Grosso do Sul</p>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          className="text-primary-foreground hover:bg-white/20"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
};