import HeaderLinks from "./HeaderLinks";

export default function Header() {
  return (
    <div className="flex flex-row justify-between items-center min-h-24 min-w-screen bg-carolina bg-opacity-60 border-b-16 border-blue-800">
      <div className="flex flex-col items-center">
        <div className="ml-8 text-blue-900 text-4xl font-mono font-extrabold">
          {"AURA"}
        </div>
        <div className="ml-8 text-blue-900 text-xl font-semibold">
          {"Project"}
        </div>
      </div>
      <HeaderLinks />
    </div>
  );
}
