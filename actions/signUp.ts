"use server";
import client from "../db/index";
import bcrypt from "bcrypt";
interface SignUp {
  StationName: string;
  StationId: string;
  email: string;
  password: string;
  phNumber: string;
}
export async function signUp({
  StationName,
  StationId,
  email,
  password,
  phNumber,
}: SignUp) {
  const stationName = StationName.toUpperCase();
  const hasedPassword = await bcrypt.hash(password, 10);
  const result = await client.user.findFirst({
    where: {
      StationId,
    },
  });
  if (!result) {
    const PoliceStation = await client.user.create({
      data: {
        StationName: stationName,
        StationId,
        email,
        password: hasedPassword,
        phNumber,
      },
    });
    console.log(PoliceStation);

    if (PoliceStation) {
      return PoliceStation;
    }
  }
}
