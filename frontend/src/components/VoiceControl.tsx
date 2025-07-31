import { useState } from 'react';
import { Mic, MicOff, Volume2, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { VoiceCommand } from '@/hooks/useVoiceControl';

interface VoiceControlProps {
  isSupported: boolean;
  isListening: boolean;
  transcript: string;
  onToggleListening: () => void;
  commands: VoiceCommand[];
}

export const VoiceControl = ({
  isSupported,
  isListening,
  transcript,
  onToggleListening,
  commands
}: VoiceControlProps) => {
  const [showCommands, setShowCommands] = useState(false);

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <Badge variant="secondary" className="text-xs">
          Controle por voz não suportado
        </Badge>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm">
      <div className="flex flex-col items-end gap-2">
        {/* Voice Commands Help */}
        <Collapsible open={showCommands} onOpenChange={setShowCommands}>
          <CollapsibleTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2"
            >
              <HelpCircle className="h-4 w-4" />
              Comandos
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <Card className="p-3 mt-2 bg-card/95 backdrop-blur-sm border shadow-lg">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Comandos de Voz
              </h4>
              <div className="space-y-1">
                {commands.slice(0, 6).map((command, index) => (
                  <div key={index} className="text-xs">
                    <span className="font-medium text-primary">
                      "{command.command}"
                    </span>
                    <span className="text-muted-foreground ml-1">
                      - {command.description}
                    </span>
                  </div>
                ))}
                {commands.length > 6 && (
                  <div className="text-xs text-muted-foreground">
                    +{commands.length - 6} outros comandos...
                  </div>
                )}
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Transcript Display */}
        {transcript && (
          <Card className="p-2 bg-card/95 backdrop-blur-sm border shadow-lg max-w-xs">
            <div className="text-xs">
              <span className="text-muted-foreground">Você disse:</span>
              <p className="text-foreground font-medium">{transcript}</p>
            </div>
          </Card>
        )}

        {/* Voice Control Button */}
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            onClick={onToggleListening}
            className={`relative h-12 w-12 rounded-full p-0 shadow-lg transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isListening ? (
              <Mic className="h-6 w-6 text-white" />
            ) : (
              <MicOff className="h-6 w-6" />
            )}
            
            {/* Listening animation */}
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping" />
            )}
          </Button>
          
          <div className="text-xs text-muted-foreground">
            {isListening ? (
              <Badge variant="destructive" className="animate-pulse">
                Ouvindo...
              </Badge>
            ) : (
              <Badge variant="secondary">
                Toque para falar
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};