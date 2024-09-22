"use client";
import React from "react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import FileViewer from "./FileView";

type data = {
  id: string;
  case: {
    id: string;
    caseId: string;
    caseFilerName: string;
    casefileHash: string;
    authorId: string;
  }[];
};

function Home({ id, case: cases }: data) {
  console.log(id);
  console.log(cases);

  const route = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  const [url, setUrl] = useState<string>("");

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed z-[999] w-full px-20 py-6 flex  items-center justify-between ">
        <div className="font-semibold text-3xl">Mega Police</div>
        <div className="links flex gap-10">
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              route.push("/home/create-file");
            }}
          >
            Create File
          </button>
          <button
            onClick={() => {
              signOut();
              route.push("/");
            }}
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Log-out
          </button>
        </div>
      </div>
      <div>
        <div className="relative overflow-x-auto items-center justify-center mt-32">
          <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Case Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Case File Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Case File Hash
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
              </tr>
            </thead>

            {cases.map((cases) => {
              {
                return (
                  <TableBody
                    key={cases.id}
                    id={cases.id}
                    caseId={cases.caseId}
                    caseFilerName={cases.caseFilerName}
                    casefileHash={cases.casefileHash}
                  />
                );
              }
            })}
          </table>
        </div>
      </div>
      <div>
        {url && (
          <div className="mt-4 text-center">
            <p>Uploaded File URL:</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
interface table {
  key: string;
  id: string;
  caseId: string;
  caseFilerName: string;
  casefileHash: string;
}
const TableBody = ({ key, id, caseId, caseFilerName, casefileHash }: table) => {
  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {caseId}
        </th>
        <td className="px-6 py-4">{caseFilerName}</td>
        <td className="px-6 py-4">{casefileHash}</td>
        <td className="px-6 py-4">
          {
            <div>
              <FileViewer ipfsHash={casefileHash} />
            </div>
          }
        </td>
      </tr>
    </tbody>
  );
};
export default Home;
