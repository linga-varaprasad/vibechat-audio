
import UserProfile from "@/components/UserProfile";

const mockUser = {
  id: "user1",
  name: "Jamie Smith",
  username: "jamiesmith",
  bio: "Audio enthusiast and podcast lover. Join me for discussions about tech, music, and more!",
  avatar: undefined,
  followersCount: 128,
  followingCount: 76
};

const ProfilePage = () => {
  return (
    <div className="py-4">
      <UserProfile user={mockUser} />
    </div>
  );
};

export default ProfilePage;
