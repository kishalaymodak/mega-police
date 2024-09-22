import React from "react";

interface FileViewerProps {
  ipfsHash: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ ipfsHash }) => {
  const fileUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

  return (
    <div className="">
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View File on Pinata
      </a>
      <div className="mt-4">
        {/* Displaying different types of files */}
        {ipfsHash.endsWith(".jpg") || ipfsHash.endsWith(".png") ? (
          <img
            src={fileUrl}
            alt="Uploaded File"
            className="mt-4 max-w-full h-auto"
          />
        ) : ipfsHash.endsWith(".mp4") ? (
          <video controls className="mt-4 max-w-full h-auto">
            <source src={fileUrl} type="video/mp4" />
          </video>
        ) : (
          <p className="mt-4"></p>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
