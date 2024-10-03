'use client'

import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FormTypeSelector from './FormTypeSelector';
import { Button } from './ui/button';
import { FileText, List, Upload } from 'lucide-react'; // Import icons

const VehicleFormProcessor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    if (!selectedType) {
      alert('Please select a form type.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('filename', selectedFile.name);
    formData.append('file_type', selectedType);

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
        const outputFilename = selectedType || 'processed_form';
        a.download = `${outputFilename}.pdf`;
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
      <div className="bg-accent shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-row items-start justify-center w-full gap-16 py-6">
          <div className="flex flex-col items-center w-1/3 max-w-[200px] bg-card rounded-lg p-4 shadow">
            <List className="w-8 h-8 mb-2 text-blue-500" />
            <span className="text-sm font-medium mb-4">Step 1: Select Form Type</span>
            <FormTypeSelector selectedType={selectedType} onTypeSelect={handleTypeSelect} />
          </div>
          <div className="flex flex-col items-center w-1/3 max-w-[200px] bg-card rounded-lg p-4 shadow">
            <FileText className="w-8 h-8 mb-2 text-green-500" />
            <span className="text-sm font-medium mb-4">Step 2: Upload File</span>
            <FileUpload onFileSelect={handleFileChange} />
          </div>
          <div className="flex flex-col items-center w-1/3 max-w-[200px] bg-card rounded-lg p-4 shadow">
            <Upload className="w-8 h-8 mb-2 text-purple-500" />
            <span className="text-sm font-medium mb-4">Step 3: Process Form</span>
            <Button
              onClick={handleSubmit}
              disabled={!selectedFile || !selectedType || isLoading}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Process Form'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleFormProcessor;