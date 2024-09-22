import React, { useState } from "react";
import axios from "axios";
import { storeFile } from "../../actions/storeFile";
import { useSession } from "next-auth/react";
import { FileUpload } from "./ui/file-upload";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const FileUploading = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [caseFilerName, setCaseFilerName] = useState<string>("");
  const [caseId, setCaseId] = useState<string>("");

  const session = useSession();

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setErrorMessage(""); // Clear error message on file change
    }
  };

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
    if (caseFilerName && caseId) {
      e.preventDefault();
      if (!file) return;

      setLoading(true);
      setErrorMessage(""); // Reset error message before upload

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            maxContentLength: Infinity,
            headers: {
              pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY || "",
              pinata_secret_api_key:
                process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const ipfsHash = response.data.IpfsHash;
        const casefileHash = ipfsHash;
        //@ts-ignore
        const authorId = session.data?.user.id;

        await storeFile({ caseFilerName, casefileHash, authorId, caseId });

        const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        setFileUrl(url);
        setUploaded(true);
      } catch (error) {
        console.error("Error uploading file:", error);
        setErrorMessage(
          "Failed to upload file. Please check your API keys and try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <form onSubmit={uploadFile}>
        <FileUpload onChange={handleFileChange} />
        <LabelInputContainer>
          <Label htmlFor="lastname">Case File Name</Label>
          <Input
            onChange={(e) => {
              setCaseFilerName(e.target.value);
            }}
            id="lastname"
            placeholder="somthing something"
            type="text"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="lastname">Case Id</Label>
          <Input
            onChange={(e) => {
              setCaseId(e.target.value);
            }}
            id="lastname"
            placeholder="123456"
            type="number"
          />
        </LabelInputContainer>
        {file && (
          <div>
            <h5 className="font-semibold">
              {file.name}{" "}
              <span className="bg-gray-900 rounded-full px-2">
                {(file.size / 1024).toFixed(2)} kb
              </span>
            </h5>
            {uploaded ? (
              <h5 className="text-green-600">
                ✅{" "}
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600"
                >
                  File Uploaded Successfully
                </a>
              </h5>
            ) : (
              <button
                type="submit"
                className={`mt-2 w-full p-2 text-white rounded ${
                  loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload File"}
              </button>
            )}
          </div>
        )}

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </form>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
export default FileUploading;
