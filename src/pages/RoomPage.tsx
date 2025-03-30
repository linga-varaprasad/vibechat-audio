
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AudioRoomInterface from "@/components/AudioRoomInterface";
import { RoomInfo } from "@/components/RoomCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data - in a real app this would come from an API
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
      { id: "u6", name: "Pat Murphy", isSpeaker: false },
      { id: "u7", name: "Robin Diaz", isSpeaker: false },
      { id: "u8", name: "Jamie Fox", isSpeaker: false },
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

const RoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomInfo | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading room data from API
    const timer = setTimeout(() => {
      const foundRoom = mockRooms.find(r => r.id === id);
      setRoom(foundRoom || null);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleLeaveRoom = () => {
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="h-screen flex flex-col space-y-6 p-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        
        <div className="grid grid-cols-3 gap-6 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Skeleton className="h-20 w-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <Skeleton className="h-14 w-14 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="h-screen flex flex-col items-center justify-center animate-fade-in">
        <p className="text-lg font-medium mb-4">Room not found</p>
        <button 
          onClick={() => navigate("/")}
          className="text-vibe-purple hover:underline transition-all hover:text-vibe-purple-dark"
        >
          Return to home
        </button>
      </div>
    );
  }
  
  return <AudioRoomInterface room={room} onLeave={handleLeaveRoom} />;
};

export default RoomPage;
