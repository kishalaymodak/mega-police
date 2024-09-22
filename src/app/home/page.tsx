import Home from "@/components/Home";
import { authOption } from "@/lib/auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { getData } from "../../../actions/getData";

async function home() {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect("/");
  }
  const id = session.user.id;
  const data = await getData(id);
  console.log(data);
  return (
    <div>
      <Home case={data?.case ?? []} id={id} />
    </div>
  );
}

export default home;
