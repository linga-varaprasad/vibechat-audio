
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, Edit } from "lucide-react";

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    username: string;
    bio: string;
    avatar?: string;
    followersCount: number;
    followingCount: number;
  };
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-end mb-2">
        <Button variant="ghost" size="icon" className="text-gray-400">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-vibe-purple text-white text-xl">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500 mb-4">@{user.username}</p>
        
        <div className="flex gap-8 mb-6">
          <div className="text-center">
            <p className="font-bold">{user.followersCount}</p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.followingCount}</p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
        
        <div className="w-full px-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 relative">
            <p className="text-sm text-gray-600">{user.bio}</p>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-gray-400 h-8 w-8"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="w-full px-4">
          <h2 className="font-semibold mb-3">Your recent rooms</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-3">
            <p className="text-sm font-medium">No recent rooms</p>
            <p className="text-xs text-gray-500 mt-1">Join or create a room to see your activity</p>
          </div>
          
          <Button 
            className="w-full bg-vibe-purple hover:bg-vibe-purple-dark text-white"
          >
            Create a Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
