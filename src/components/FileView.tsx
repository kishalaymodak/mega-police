import React from "react";

interface FileViewerProps {
  ipfsHash: string;
}

const FileViewer: React.FC<FileViewerProps> = ({ ipfsHash }) => {
  const fileUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-4">File Viewer</h2>
      <p className="mb-2">IPFS Hash: {ipfsHash}</p>
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
            Your browser does not support the video tag.
          </video>
        ) : (
          <p className="mt-4">File type not supported for preview.</p>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
