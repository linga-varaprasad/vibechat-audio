
import { useState } from "react";
import RoomCard, { RoomInfo } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockRooms: RoomInfo[] = [
  {
    id: "1",
    title: "Tech Talk: The Future of AI",
    category: "Technology",
    participants: [
      { id: "u1", name: "Alex Johnson", isSpeaker: true, isActive: true },
      { id: "u2", name: "Maria Garcia", isSpeaker: true },
      { id: "u3", name: "Sam Smith", isSpeaker: true, isActive: true },
      { id: "u4", name: "Taylor Wilson", isSpeaker: false },
      { id: "u5", name: "Jordan Lee", isSpeaker: false },
    ],
    listenerCount: 42
  },
  {
    id: "2",
    title: "Music Production Masterclass",
    category: "Music",
    participants: [
      { id: "u6", name: "Chris Evans", isSpeaker: true, isActive: true },
      { id: "u7", name: "Jamie Fox", isSpeaker: true },
      { id: "u8", name: "Leslie Kim", isSpeaker: false },
    ],
    listenerCount: 28
  },
  {
    id: "3",
    title: "Mindfulness Meditation Session",
    category: "Wellness",
    participants: [
      { id: "u9", name: "Riley Parker", isSpeaker: true, isActive: true },
      { id: "u10", name: "Morgan Taylor", isSpeaker: false },
      { id: "u11", name: "Casey Johnson", isSpeaker: false },
      { id: "u12", name: "Alex Smith", isSpeaker: false },
    ],
    listenerCount: 19
  }
];

const Index = () => {
  const [rooms, setRooms] = useState<RoomInfo[]>(mockRooms);
  const navigate = useNavigate();
  
  return (
    <div className="pt-4 pb-24 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-vibe-purple to-vibe-purple-dark bg-clip-text text-transparent">
          VoiceVibe
        </h1>
        <Button 
          className="rounded-full bg-vibe-purple hover:bg-vibe-purple-dark text-white shadow-sm hover:shadow-md transform transition-all duration-300 hover:scale-105"
          size="sm"
          onClick={() => navigate("/create-room")}
        >
          <Plus className="mr-1 h-4 w-4" /> Create Room
        </Button>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Trending Now</h2>
        <div className="space-y-5">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
