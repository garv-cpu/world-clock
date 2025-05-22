import AnalogClock from "./AnalogClock";

export default function MiniClock({ label, timezone }) {
  return <AnalogClock timezone={timezone} size={180} label={label} />;
}
