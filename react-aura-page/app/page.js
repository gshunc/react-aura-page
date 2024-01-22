import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row items-center min-h-24 min-w-screen bg-carolina bg-opacity-60">
        <div className="flex flex-col items-center">
          <div className="ml-8 text-blue-900 text-4xl font-mono font-extrabold">
            {"AURA"}
          </div>
          <div className="ml-8 text-blue-900 text-xl font-semibold">
            {"Project"}
          </div>
        </div>
      </div>
    </main>
  );
}
