import { useEffect, useState } from "react";
import { NotificationPanel } from "./NotificationPanel";

interface TopbarProps {
  userName: string;
  onSettingsClick?: () => void;
}

export function Topbar({ userName, onSettingsClick }: TopbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount] = useState(4);

  return (
    <header className="bg-navy px-6 md:px-8 py-4 flex items-center justify-between flex-shrink-0 sticky top-0 z-10 shadow-sm gap-4">
      {/* Logo */}
      <div className="font-rajdhani text-2xl font-bold letter-spacing-wider text-white flex-shrink-0">
        ACDP
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm">
        <input
          type="text"
          placeholder="Search Term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        />
      </div>

      {/* Filter Button */}
      <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all flex items-center gap-2">
        <span>⊙</span>
        Filter
      </button>

      {/* Right Section */}
      <div className="flex items-center gap-4 ml-auto relative">
        {/* Notification button */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer text-lg text-white relative transition-all hover:bg-white/20"
        >
          🔔
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red rounded-full text-xs flex items-center justify-center text-white font-bold">
              {unreadCount}
            </div>
          )}
        </button>

        {/* Settings button */}
        <button
          onClick={onSettingsClick}
          className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer text-lg text-white transition-all hover:bg-white/20"
        >
          ⚙️
        </button>

        {/* Notification Panel */}
        {showNotifications && (
          <NotificationPanel onClose={() => setShowNotifications(false)} />
        )}
      </div>
    </header>
  );
}
