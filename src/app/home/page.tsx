import Home from "@/components/Home";
import { authOption } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function home() {
  const session = await getServerSession(authOption);
  console.log(session.user.id);

  if (!session) {
    redirect("/logIn");
  }

  return (
    <div>
      <Home />
    </div>
  );
}

export default home;
