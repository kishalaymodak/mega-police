"use server";
import { db } from "../db/db";
import client from "../db/index";

interface FileData {
  caseId: string;
  caseFilerName: string;
  casefileHash: string;
  authorId: string;
}

export async function storeFile({
  caseId,
  caseFilerName,
  casefileHash,
  authorId,
}: FileData) {
  const CaseFileName = caseFilerName.toUpperCase();

  const res = await client.case.create({
    data: {
      caseId,
      casefileHash,
      caseFilerName: CaseFileName,
      authorId,
    },
  });
  console.log(res);

  if (res) {
    return res;
  }
}
