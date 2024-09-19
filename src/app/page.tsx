import { Landing } from "@/components/Landing";
import { Nav } from "@/components/Nav";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-black h-screen?">
        <div className="absolutei w-full p-2">
          <Nav />
        </div>

        <Landing />
      </div>
    </>
  );
}
