import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setErrorMessage(""); // Clear error message on file change
    }
  };

  const uploadFile = async (e: React.FormEvent<HTMLFormElement>) => {
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
      console.log(ipfsHash);

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
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <form onSubmit={uploadFile}>
        <input
          required
          type="file"
          onChange={handleFileChange}
          className="mb-3 p-2 border border-gray-300 rounded w-full"
        />
        {file && (
          <div>
            <h5 className="font-semibold">
              {file.name}{" "}
              <span className="bg-gray-200 rounded-full px-2">
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

export default FileUpload;
