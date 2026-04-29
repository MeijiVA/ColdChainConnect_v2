import { useEffect, useState } from "react";

interface TopbarProps {
  userName: string;
}

export function Topbar({ userName }: TopbarProps) {
  const [dateTime, setDateTime] = useState<{
    time: string;
    dayDate: string;
  }>({ time: "", dayDate: "" });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format time
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Format day and date
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      const dayDate = now.toLocaleDateString("en-US", options);

      setDateTime({ time, dayDate });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white px-4 md:px-7 py-3 flex items-center justify-between border-b border-border flex-shrink-0 sticky top-0 z-10 shadow-sm">
      <div className="font-rajdhani text-sm md:text-lg text-navy flex items-center gap-2.5">
        <span className="text-lg md:text-2xl">👋</span>
        <span className="hidden sm:inline">Good to See you, {userName}!</span>
        <span className="sm:hidden">Hi, {userName}!</span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:block text-right text-xs text-muted leading-relaxed">
          <strong className="block text-sm text-navy">{dateTime.time}</strong>
          <span className="hidden md:inline">{dateTime.dayDate}</span>
        </div>

        {/* Notification button */}
        <button className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-off-white border border-border flex items-center justify-center cursor-pointer text-sm md:text-base text-muted relative transition-all hover:text-white hover:bg-accent">
          🔔
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red rounded-full text-2xs flex items-center justify-center text-white font-bold">
            4
          </div>
        </button>

        {/* Settings button */}
        <button className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-off-white border border-border flex items-center justify-center cursor-pointer text-sm md:text-base text-muted transition-all hover:text-white hover:bg-accent">
          ⚙️
        </button>
      </div>
    </header>
  );
}
