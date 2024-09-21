"use server";
import client from "../db/index";

export async function getData(id: string) {
  const res = await client.user.findFirst({
    where: {
      id,
    },
    select: {
      StationName: true,
      id: true,
      case: true,
    },
  });
  if (res) {
    return res;
  }
}
