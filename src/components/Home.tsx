"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FileViewer from "./FileView";
import FileUploading from "./Upload";
import { getData } from "../../actions/getData";

function Home() {
  console.log(id);

  const data = getData(id);
  console.log(data);

  const route = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  const [url, setUrl] = useState<string>("");
  const ipfsHash = "QmeFqmQupbMWVsCHZys2rTbTzUzjcDcBRzA8813VyWyHL9";
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
      <div>
        <FileUploading />
        {/* <div>
          <FileViewer ipfsHash={ipfsHash} />
        </div>
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
        )} */}
      </div>
    </div>
  );
}

export default Home;
