
import { useState } from "react";
import { Mic, MicOff, Hand, X, Users, Plus } from "lucide-react";
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
      <div className="grid grid-cols-3 gap-6 mt-8">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="flex flex-col items-center">
            <div className={`speaker-avatar relative ${speaker.isActive ? 'active' : ''}`}>
              <Avatar className="w-20 h-20 border-2 border-white shadow-sm hover:shadow-md transition-shadow">
                <AvatarImage src={speaker.avatar} alt={speaker.name} />
                <AvatarFallback className="bg-vibe-purple-light text-vibe-purple font-medium text-lg">
                  {speaker.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {speaker.isActive && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-vibe-purple rounded-full border-2 border-white shadow-sm" />
              )}
            </div>
            <span className="mt-3 text-sm font-semibold">{speaker.name}</span>
            {!speaker.isActive && <span className="text-xs text-gray-400 mt-1">muted</span>}
          </div>
        ))}
      </div>
    );
  };
  
  const renderListeners = () => {
    const listeners = activeParticipants.filter(p => !p.isSpeaker);
    
    return (
      <div className="mt-10 bg-gray-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-4 h-4" />
            <span className="font-semibold">Listeners ({listeners.length})</span>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {listeners.map((listener) => (
            <div key={listener.id} className="flex flex-col items-center group">
              <Avatar className="w-14 h-14 border-2 border-white shadow-sm group-hover:shadow-md transition-shadow">
                <AvatarImage src={listener.avatar} alt={listener.name} />
                <AvatarFallback className="bg-vibe-gray-lightest text-gray-500 font-medium">
                  {listener.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="mt-2 text-xs font-medium truncate w-full text-center">
                {listener.name}
              </span>
            </div>
          ))}
          
          <div className="flex flex-col items-center justify-center">
            <Button variant="ghost" className="w-14 h-14 rounded-full border-2 border-dashed border-gray-200 hover:bg-vibe-purple-light hover:border-vibe-purple transition-colors group">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-vibe-purple transition-colors" />
            </Button>
            <span className="mt-2 text-xs font-medium text-gray-400">Invite</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="pt-6 pb-20 animate-fade-in">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-vibe-gray-lightest text-gray-600 font-medium px-3 py-1.5">
          {room.category}
        </Badge>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          onClick={onLeave}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold mt-5 text-gray-800">{room.title}</h1>
      <p className="text-sm text-gray-500 mt-1">{activeParticipants.length} participants • Active for 45 min</p>
      
      {renderSpeakers()}
      {renderListeners()}
      
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 py-5 px-6 shadow-md animate-slide-up">
        <div className="max-w-screen-md mx-auto flex justify-center gap-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant={isMuted ? "outline" : "default"}
                size="lg"
                className={isMuted 
                  ? "rounded-full border-vibe-purple text-vibe-purple hover:bg-vibe-purple-light hover:border-vibe-purple-dark transition-all duration-300" 
                  : "rounded-full bg-vibe-purple text-white hover:bg-vibe-purple-dark shadow-md hover:shadow-lg transition-all duration-300"}
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
                  ? "rounded-full bg-vibe-purple text-white hover:bg-vibe-purple-dark shadow-md hover:shadow-lg transition-all duration-300" 
                  : "rounded-full border-vibe-purple text-vibe-purple hover:bg-vibe-purple-light hover:border-vibe-purple-dark transition-all duration-300"}
                onClick={toggleRaiseHand}
              >
                <Hand className="w-5 h-5" />
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
