
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AudioRoomInterface from "@/components/AudioRoomInterface";
import { RoomInfo } from "@/components/RoomCard";

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
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleLeaveRoom = () => {
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-vibe-purple font-medium">Loading room...</div>
      </div>
    );
  }
  
  if (!room) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-lg font-medium mb-4">Room not found</p>
        <button 
          onClick={() => navigate("/")}
          className="text-vibe-purple hover:underline"
        >
          Return to home
        </button>
      </div>
    );
  }
  
  return <AudioRoomInterface room={room} onLeave={handleLeaveRoom} />;
};

export default RoomPage;
