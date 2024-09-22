import DashBoard from "@/components/DashBoard";
import FileUploading from "@/components/Upload";
import { authOption } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

import React from "react";

async function createFile() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <div className="fixed z-[999] w-full px-20 py-6 flex  items-center justify-between ">
        <div className="font-semibold text-3xl">
          <Link className="" href="/home">
            Mega Police
          </Link>
        </div>
        <div className="links flex gap-10">
          <Link
            className=" px-4 py-2 rounded-lg bg-slate-200 text-black"
            href="/home"
          >
            Home
          </Link>
        </div>
      </div>
      <DashBoard />
    </div>
  );
}

export default createFile;
