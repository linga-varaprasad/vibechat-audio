
import { useState } from "react";
import { Mic, MicOff, HandRaised, X, Users, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RoomInfo } from "./RoomCard";

interface AudioRoomInterfaceProps {
  room: RoomInfo;
  onLeave: () => void;
}

const AudioRoomInterface = ({ room, onLeave }: AudioRoomInterfaceProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeParticipants, setActiveParticipants] = useState(
    room.participants.map(p => ({ ...p }))
  );
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const toggleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
  };
  
  const renderSpeakers = () => {
    const speakers = activeParticipants.filter(p => p.isSpeaker);
    
    return (
      <div className="grid grid-cols-3 gap-4 mt-6">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex flex-col items-center">
            <div className={`speaker-avatar ${speaker.isActive ? 'active' : ''}`}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={speaker.avatar} alt={speaker.name} />
                <AvatarFallback className="bg-vibe-purple-light text-vibe-purple">
                  {speaker.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {speaker.isActive && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-vibe-purple rounded-full border-2 border-white" />
              )}
            </div>
            <span className="mt-2 text-sm font-medium">{speaker.name}</span>
            {!speaker.isActive && <span className="text-xs text-gray-400">muted</span>}
          </div>
        ))}
      </div>
    );
  };
  
  const renderListeners = () => {
    const listeners = activeParticipants.filter(p => !p.isSpeaker);
    
    return (
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Users className="w-4 h-4" />
            <span className="font-medium">Listeners ({listeners.length})</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          {listeners.map((listener) => (
            <div key={listener.id} className="flex flex-col items-center">
              <Avatar className="w-12 h-12">
                <AvatarImage src={listener.avatar} alt={listener.name} />
                <AvatarFallback className="bg-vibe-gray-lightest text-gray-500">
                  {listener.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="mt-1 text-xs font-medium truncate w-full text-center">
                {listener.name}
              </span>
            </div>
          ))}
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-300" />
            </div>
            <span className="mt-1 text-xs font-medium text-gray-400">Invite</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="pt-4 pb-20 animate-fade-in">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-vibe-gray-lightest text-gray-500">
          {room.category}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-400 hover:text-gray-500 rounded-full"
          onClick={onLeave}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mt-4">{room.title}</h1>
      
      {renderSpeakers()}
      {renderListeners()}
      
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-100 py-4 px-6">
        <div className="max-w-screen-md mx-auto flex justify-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={isMuted ? "outline" : "default"}
                size="lg"
                className={isMuted 
                  ? "rounded-full border-vibe-purple text-vibe-purple hover:bg-vibe-purple-light" 
                  : "rounded-full bg-vibe-purple text-white hover:bg-vibe-purple-dark"}
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMuted ? "Unmute" : "Mute"}</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={isHandRaised ? "default" : "outline"}
                size="lg"
                className={isHandRaised 
                  ? "rounded-full bg-vibe-purple text-white hover:bg-vibe-purple-dark" 
                  : "rounded-full border-vibe-purple text-vibe-purple hover:bg-vibe-purple-light"}
                onClick={toggleRaiseHand}
              >
                <HandRaised className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isHandRaised ? "Lower hand" : "Raise hand"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default AudioRoomInterface;
