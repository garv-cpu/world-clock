import React from "react";
import MainClock from "./components/MainClock";
import MiniClock from "./components/MiniClock";

const miniClocks = [
  { label: "India", timezone: "Asia/Kolkata" },
  { label: "New York", timezone: "America/New_York" },
  { label: "London", timezone: "Europe/London" },
  { label: "Tokyo", timezone: "Asia/Tokyo" },
  { label: "Sydney", timezone: "Australia/Sydney" },
  { label: "Berlin", timezone: "Europe/Berlin" },
  { label: "Dubai", timezone: "Asia/Dubai" },
  { label: "Shanghai", timezone: "Asia/Shanghai" },
];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center gap-9 p-6">
      <MainClock />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {miniClocks.map((clock) => (
          <MiniClock key={clock.timezone} {...clock} />
        ))}
      </div>
    </div>
  );
};

export default App;
