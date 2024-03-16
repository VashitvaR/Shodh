import Image from "next/image";
import Dashboard from "./dash/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-[50px] font-bold">Welcome to the Dashboard</h1>
      <Dashboard />
    </main>
  );
}
