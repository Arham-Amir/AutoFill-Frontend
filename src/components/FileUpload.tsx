import React, { useState } from 'react';
import { buttonVariants } from "@/components/ui/button"
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label htmlFor="fileInput" className={cn(buttonVariants({ variant: "outline" }), 'w-full overflow-hidden')} >
          {selectedFile?.name || "Select PDF"}
      </label>

      {/* {selectedFile && (
        <p className="mt-2 text-sm text-gray-600">
          Selected file: {selectedFile.name}
        </p>
      )} */}
    </div>
  );
};

export default FileUpload;