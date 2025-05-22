import { useState } from "react";
import { timezones } from "../utils/timezones";
import AnalogClock from "./AnalogClock";

export default function MainClock() {
  const [timezone, setTimezone] = useState("UTC");

  return (
    <div className="flex flex-col items-center gap-4">
      <AnalogClock
        timezone={timezone}
        size={250}
        label={`Time in ${timezone}`}
      />
      <select
        className="mt-2 bg-gray-800 text-white px-4 py-2 rounded-md shadow"
        value={timezone}
        onChange={(e) => setTimezone(e.target.value)}
      >
        {timezones.map((tz) => (
          <option key={tz} value={tz}>
            {tz}
          </option>
        ))}
      </select>
    </div>
  );
}
