"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Nav() {
  return (
    <>
      <div className="fixed z-[999] w-full px-20 py-6 flex  items-center justify-between ">
        <div className="font-semibold text-3xl">Mega Police</div>
        <div className="links flex gap-10">
          <Button asChild className="px-4 py-5" variant="outline">
            <Link className="text-xl " href="/signUp">
              Sign-up
            </Link>
          </Button>
          <Button asChild className="px-4 py-5" variant="default">
            <Link className="text-xl" href="/logIn">
              Log-in
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
