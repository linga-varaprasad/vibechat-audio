
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

interface Notification {
  id: string;
  type: 'room_invite' | 'speaker_invite' | 'followed' | 'room_started';
  title: string;
  message: string;
  time: string;
  read: boolean;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
  roomId?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "room_invite",
    title: "Room Invitation",
    message: "Alex Johnson invited you to join 'Tech Talk: The Future of AI'",
    time: "2 hours ago",
    read: false,
    user: { id: "u1", name: "Alex Johnson" },
    roomId: "1"
  },
  {
    id: "n2",
    type: "followed",
    title: "New Follower",
    message: "Maria Garcia started following you",
    time: "Yesterday",
    read: true,
    user: { id: "u2", name: "Maria Garcia" }
  },
  {
    id: "n3",
    type: "speaker_invite",
    title: "Speaker Invitation",
    message: "You've been invited to speak in 'Music Production Masterclass'",
    time: "2 days ago",
    read: true,
    roomId: "2"
  },
  {
    id: "n4",
    type: "room_started",
    title: "Room Started",
    message: "A room you're interested in 'Mindfulness Meditation Session' has started",
    time: "3 days ago",
    read: true,
    roomId: "3"
  }
];

const NotificationItem = ({ notification }: { notification: Notification }) => {
  return (
    <div className={`p-4 border-b ${!notification.read ? 'bg-vibe-purple-light/10' : ''}`}>
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          {notification.user ? (
            <>
              <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
              <AvatarFallback className="bg-vibe-purple-light text-vibe-purple">
                {notification.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </>
          ) : (
            <AvatarFallback className="bg-vibe-purple text-white">
              <Bell className="h-5 w-5" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-sm">{notification.title}</h3>
            <span className="text-xs text-gray-400">{notification.time}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
        </div>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  return (
    <div className="pt-4 pb-4">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      
      {notifications.length > 0 ? (
        <div className="border rounded-lg overflow-hidden animate-fade-in">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bell className="mx-auto h-10 w-10 text-gray-300 mb-3" />
          <p className="text-gray-500">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
