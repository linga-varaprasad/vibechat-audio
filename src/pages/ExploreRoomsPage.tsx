
import { useState } from "react";
import RoomCard, { RoomInfo } from "@/components/RoomCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const mockRooms: RoomInfo[] = [
  {
    id: "1",
    title: "Tech Talk: The Future of AI",
    category: "Technology",
    participants: [
      { id: "u1", name: "Alex Johnson", isSpeaker: true, isActive: true },
      { id: "u2", name: "Maria Garcia", isSpeaker: true },
      { id: "u3", name: "Sam Smith", isSpeaker: true, isActive: true },
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
    ],
    listenerCount: 28
  },
  {
    id: "3",
    title: "Mindfulness Meditation Session",
    category: "Wellness",
    participants: [
      { id: "u9", name: "Riley Parker", isSpeaker: true, isActive: true },
    ],
    listenerCount: 19
  },
  {
    id: "4",
    title: "Creative Writing Workshop",
    category: "Art",
    participants: [
      { id: "u13", name: "Terry Johnson", isSpeaker: true, isActive: true },
      { id: "u14", name: "Leslie Moore", isSpeaker: true },
    ],
    listenerCount: 15
  },
  {
    id: "5",
    title: "Photography Tips & Tricks",
    category: "Art",
    participants: [
      { id: "u15", name: "Jordan Reeves", isSpeaker: true, isActive: true },
    ],
    listenerCount: 22
  },
];

const categories = ["All", "Technology", "Music", "Wellness", "Art", "Business", "Education"];

const ExploreRoomsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRooms = mockRooms.filter(room => {
    // Filter by category if not "All"
    const categoryMatch = activeCategory === "All" || room.category === activeCategory;
    
    // Filter by search query
    const searchMatch = searchQuery === "" || 
      room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });
  
  return (
    <div className="pt-4 pb-4">
      <h1 className="text-2xl font-bold mb-6">Explore Rooms</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10 bg-gray-50 border-gray-100 rounded-full"
          placeholder="Search rooms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === category
                  ? "bg-vibe-purple text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredRooms.length > 0 ? (
        <div className="space-y-4">
          {filteredRooms.map((room) => (
            <div key={room.id} className="animate-scale-in">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No rooms match your search</p>
        </div>
      )}
    </div>
  );
};

export default ExploreRoomsPage;
