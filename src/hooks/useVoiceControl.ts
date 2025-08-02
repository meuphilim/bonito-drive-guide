import { useState, useEffect, useCallback } from 'react';

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: any) => void;
  onstart: () => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

export const useVoiceControl = (commands: VoiceCommand[]) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'pt-BR';

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptText;
          } else {
            interimTranscript += transcriptText;
          }
        }

        setTranscript(finalTranscript + interimTranscript);

        // Process final transcript for commands
        if (finalTranscript) {
          processVoiceCommand(finalTranscript.toLowerCase().trim());
        }
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const processVoiceCommand = useCallback((transcript: string) => {
    // Remove common filler words and normalize
    const normalizedTranscript = transcript
      .replace(/\b(por favor|obrigado|obrigada)\b/g, '')
      .trim();

    // Find matching command
    const matchedCommand = commands.find(cmd => {
      const commandWords = cmd.command.toLowerCase().split(' ');
      return commandWords.every(word => normalizedTranscript.includes(word));
    });

    if (matchedCommand) {
      console.log('Voice command matched:', matchedCommand.command);
      matchedCommand.action();
      setTranscript(''); // Clear transcript after command execution
    }
  }, [commands]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Text-to-Speech for responses
  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      // Try to find a Portuguese voice
      const voices = speechSynthesis.getVoices();
      const portugueseVoice = voices.find(voice => 
        voice.lang.startsWith('pt') || voice.lang.startsWith('pt-BR')
      );
      
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
      }

      speechSynthesis.speak(utterance);
    }
  }, []);

  return {
    isSupported,
    isListening,
    transcript,
    startListening,
    stopListening,
    toggleListening,
    speak,
  };
};