'use client'

import React, { useState } from 'react';
import DragDropFileUpload from './DragDropFileUpload';
import { Button } from './ui/button';

const VehicleFormProcessor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name);

    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/process_vehicle_form/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedFile.name.split('.')[0]}-output.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('File processing failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the file.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vehicle Form Processor</h1>
      <DragDropFileUpload onFileChange={handleFileChange} />
      <Button 
        onClick={handleSubmit} 
        disabled={!selectedFile || isLoading}
        className="mt-4"
      >
        {isLoading ? 'Processing...' : 'Process Form'}
      </Button>
    </div>
  );
};

export default VehicleFormProcessor;