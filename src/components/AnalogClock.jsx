import { useEffect, useState } from "react";

export default function AnalogClock({ timezone = "UTC", size = 200, label }) {
  const [now, setNow] = useState(new Date());
  const [isDark, setIsDark] = useState(true);
  const [is24Hour, setIs24Hour] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = new Date(now.toLocaleString("en-US", { timeZone: timezone }));

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const center = size / 2;
  const radius = center - 28; // Position numbers inside the circle

  const handBase =
    "absolute left-1/2 origin-bottom transition-all duration-500 ease-in-out";

  const tickMarks = Array.from({ length: 60 }, (_, i) => {
    const isHour = i % 5 === 0;
    const length = isHour ? 8 : 4;
    const width = isHour ? 2 : 1;
    const rotate = i * 6;

    return (
      <div
        key={i}
        className={`absolute top-1/2 left-1/2 ${isDark ? "bg-white" : "bg-black"}`}
        style={{
          width: `${width}px`,
          height: `${length}px`,
          transform: `rotate(${rotate}deg) translate(-50%, -${center - 5}px)`,
          transformOrigin: "bottom",
        }}
      />
    );
  });

  const clockNumbers = Array.from({ length: 12 }, (_, i) => {
    const number = i === 0 ? 12 : i; // 12 at top, then 1-11 clockwise
    const angleDeg = i * 30 - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = center + radius * Math.cos(angleRad);
    const y = center + radius * Math.sin(angleRad);
  
    return (
      <div
        key={number}
        className={`absolute text-xs ${isDark ? "text-white" : "text-black"}`}
        style={{
          top: `${y}px`,
          left: `${x}px`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      >
        {number}
      </div>
    );
  });
  

  // Adjust hour based on 12h or 24h mode
  const displayedHour = is24Hour ? hours : hours % 12;

  return (
    <div className="flex flex-col items-center space-y-3">
      {label && (
        <div className="text-sm font-medium text-center max-w-xs break-words">
          {label}
        </div>
      )}

      {/* Clock face with tap events */}
      <div
        className={`relative rounded-full border-4 ${
          isDark ? "border-white bg-gray-800" : "border-black bg-white"
        } overflow-hidden cursor-pointer`}
        onClick={(e) => {
          if (e.shiftKey) {
            setIs24Hour(!is24Hour);
          } else {
            setIsDark(!isDark);
          }
        }}
        title="Click to toggle theme, Shift+Click to toggle 12/24h"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        {tickMarks}
        {clockNumbers}

        {/* Hour hand */}
        <div
          className={`${handBase} ${isDark ? "bg-white" : "bg-black"} h-1/4 w-1`}
          style={{
            transform: `rotate(${(displayedHour % 12) * 30 + minutes / 2}deg) translateX(-50%)`,
            top: `${center * 0.25}px`,
          }}
        />
        {/* Minute hand */}
        <div
          className={`${handBase} ${isDark ? "bg-white" : "bg-black"} h-1/3 w-[2px]`}
          style={{
            transform: `rotate(${minutes * 6}deg) translateX(-50%)`,
            top: `${center * 0.1}px`,
          }}
        />
        {/* Second hand */}
        <div
          className={`absolute left-1/2 origin-bottom ${
            isDark ? "bg-red-500" : "bg-red-600"
          } h-2/5 w-[1px] transition-all duration-500 ease-in-out`}
          style={{
            transform: `rotate(${seconds * 6}deg) translateX(-50%)`,
            top: `${center * 0.05}px`,
          }}
        />
        {/* Center Dot */}
        <div
          className={`absolute rounded-full w-2 h-2 ${
            isDark ? "bg-white" : "bg-black"
          } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        />
      </div>

      <div className="text-xs text-gray-500">
        Tap to Change Theme
      </div>
    </div>
  );
}
