import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface DragDropFileUploadProps {
  onFileChange: (file: File | null) => void;
}

const DragDropFileUpload: React.FC<DragDropFileUploadProps> = ({ onFileChange }) => {
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onFileChange(file);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ 
    onDrop: handleDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? 'active' : ''} h-[250px] content-center bg-secondary`}
      style={{
        border: '2px dashed #cccccc',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {acceptedFiles.length > 0 ? (
        <p>Selected file: {acceptedFiles[0].name}</p>
      ) : (
        <p>{isDragActive ? 'Drop the file here' : 'Drag & drop a PDF file here, or click to select a file'}</p>
      )}
    </div>
  );
};

export default DragDropFileUpload;