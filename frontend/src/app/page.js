import Image from "next/image";
import Dashboard from "./dash/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Dashboard />
    </main>
  );
}
