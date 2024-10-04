import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DragDropFileUploadProps {
  onFileSelect: (file: File | null) => void;
}

const DragDropFileUpload: React.FC<DragDropFileUploadProps> = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
        isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
      }`}
    >
      <input {...getInputProps()} />
      {fileName ? (
        <p className="text-sm text-center">{fileName}</p>
      ) : (
        <>
          <Upload className="w-6 h-6 mb-2 text-gray-400" />
          <p className="text-sm text-center">
            {isDragActive ? 'Drop the pdf here' : 'Drop your PDF or browse'}
          </p>
        </>
      )}
    </div>
  );
};

export default DragDropFileUpload;