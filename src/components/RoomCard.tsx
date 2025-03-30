
import { useState } from "react";
import { Users, Headphones } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export interface RoomInfo {
  id: string;
  title: string;
  category: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isSpeaker: boolean;
    isActive?: boolean;
  }[];
  listenerCount: number;
}

interface RoomCardProps {
  room: RoomInfo;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleJoinRoom = () => {
    navigate(`/room/${room.id}`);
  };
  
  const renderParticipants = () => {
    // Only show speakers in the preview
    const speakers = room.participants.filter(p => p.isSpeaker);
    const displayCount = Math.min(speakers.length, 3);
    
    return (
      <div className="flex -space-x-2 mt-3">
        {speakers.slice(0, displayCount).map((participant) => (
          <Avatar 
            key={participant.id}
            className={`w-10 h-10 border-2 border-white ${participant.isActive ? 'ring-2 ring-vibe-purple' : ''}`}
          >
            <AvatarImage src={participant.avatar} alt={participant.name} />
            <AvatarFallback className="bg-vibe-purple-light text-vibe-purple">
              {participant.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        
        {speakers.length > 3 && (
          <div className="w-10 h-10 rounded-full bg-vibe-gray-lightest flex items-center justify-center border-2 border-white">
            <span className="text-xs font-medium text-gray-500">+{speakers.length - 3}</span>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div 
      className="room-card animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleJoinRoom}
    >
      <div className="flex justify-between items-start">
        <Badge variant="outline" className="bg-vibe-gray-lightest text-gray-500 hover:bg-vibe-gray-lightest">
          {room.category}
        </Badge>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Headphones className="w-4 h-4" />
          <span>{room.listenerCount}</span>
        </div>
      </div>
      
      <h3 className="font-semibold text-lg mt-2 line-clamp-1">{room.title}</h3>
      
      <div className="flex justify-between items-end mt-2">
        {renderParticipants()}
        
        <button 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                     ${isHovered 
                       ? 'bg-vibe-purple text-white' 
                       : 'bg-vibe-purple-light text-vibe-purple'}`}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
