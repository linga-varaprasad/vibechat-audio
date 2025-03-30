
import { useState, useEffect, useCallback } from 'react';
import webRTCService from '../services/webRTC';
import { toast } from '@/hooks/use-toast';

export interface AudioRoomState {
  isAudioInitialized: boolean;
  isMicrophoneEnabled: boolean;
  isConnecting: boolean;
  isConnected: boolean;
  participantStates: Record<string, { isSpeaking: boolean, audioLevel: number }>;
}

export const useAudioRoom = (roomId: string) => {
  const [state, setState] = useState<AudioRoomState>({
    isAudioInitialized: false,
    isMicrophoneEnabled: false,
    isConnecting: false,
    isConnected: false,
    participantStates: {}
  });
  
  // Initialize audio
  const initializeAudio = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true }));
    
    try {
      const success = await webRTCService.initializeAudio();
      
      if (success) {
        setState(prev => ({
          ...prev,
          isAudioInitialized: true,
          isConnecting: false,
          isConnected: true,
          isMicrophoneEnabled: false // Start muted by default
        }));
        
        webRTCService.toggleMicrophone(false); // Ensure mic starts muted
        toast({
          title: "Microphone connected",
          description: "You've joined the audio room. You are currently muted.",
        });
      } else {
        setState(prev => ({ ...prev, isConnecting: false }));
        toast({
          variant: "destructive",
          title: "Connection failed",
          description: "Could not access your microphone. Please check permissions.",
        });
      }
    } catch (error) {
      console.error("Error in initializeAudio:", error);
      setState(prev => ({ ...prev, isConnecting: false }));
      toast({
        variant: "destructive",
        title: "Connection error",
        description: "An error occurred while connecting to the audio room.",
      });
    }
  }, [roomId]);
  
  // Toggle microphone
  const toggleMicrophone = useCallback(() => {
    if (!state.isAudioInitialized) return;
    
    const newState = !state.isMicrophoneEnabled;
    webRTCService.toggleMicrophone(newState);
    
    setState(prev => ({ ...prev, isMicrophoneEnabled: newState }));
    
    toast({
      title: newState ? "Microphone unmuted" : "Microphone muted",
      description: newState ? "Others in the room can now hear you." : "You are now muted.",
    });
  }, [state.isAudioInitialized, state.isMicrophoneEnabled]);
  
  // Cleanup effect
  useEffect(() => {
    return () => {
      if (state.isAudioInitialized) {
        webRTCService.cleanup();
        console.log("Audio room cleanup on component unmount");
      }
    };
  }, [state.isAudioInitialized]);
  
  return {
    ...state,
    initializeAudio,
    toggleMicrophone
  };
};
