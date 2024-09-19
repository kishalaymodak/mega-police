"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
function Home() {
  const route = useRouter();
  return (
    <div>
      <div className="fixed z-[999] w-full px-20 py-6 flex  items-center justify-between ">
        <div className="font-semibold text-3xl">Mega Poslice</div>
        <div className="links flex gap-10">
          <button
            onClick={() => {
              route.push("/");
              signOut();
            }}
            className="px-4 py-5 "
          >
            Log-out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
