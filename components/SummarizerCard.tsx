'use client';

import React, { useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, RotateCcw } from 'lucide-react';
import { summarizeContent, extractTextFromFile } from '@/lib/actions';
import { CopyButton } from './CopyButton';

const SummarizerCard = () => {
  const [progress, setProgress] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [summary, setSummary] = React.useState<string>('');
  const [inputText, setInputText] = React.useState('');
  const [error, setError] = React.useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Check file size (e.g., 10MB limit)
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('File size too large. Please upload a file smaller than 10MB.');
        }

        setSelectedFile(file);
        setError('');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to process file');
        setSelectedFile(null);
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        if (file.size > 10 * 1024 * 1024) {
          throw new Error('File size too large. Please upload a file smaller than 10MB.');
        }

        setSelectedFile(file);
        setError('');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to process file');
        setSelectedFile(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSummarize = async () => {
    try {
      setError('');
      setIsProcessing(true);
      setProgress(0);

      // Start progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => prev >= 90 ? prev : prev + 10);
      }, 300);

      let textToSummarize: string;
      
      if (selectedFile) {
        // Extract text from file
        textToSummarize = await extractTextFromFile(selectedFile);
      } else if (inputText.trim()) {
        textToSummarize = inputText;
      } else {
        throw new Error('Please provide some text or upload a file to summarize');
      }

      const result = await summarizeContent(textToSummarize);

      clearInterval(progressInterval);
      setProgress(100);
      setSummary(result);

      // Reset progress after summary is shown
      setTimeout(() => setProgress(0), 500);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate summary');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setInputText('');
    setSummary('');
    setError('');
    setProgress(0);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="w-[600px] mx-auto backdrop-blur-md bg-white/10 border-white/20">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="w-full h-auto p-0 grid grid-cols-2 bg-white/5 rounded-none">
            <TabsTrigger 
              value="upload" 
              className="rounded-none border-r border-white/20 data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white py-2.5"
            >
              Upload a File
            </TabsTrigger>
            <TabsTrigger 
              value="text" 
              className="rounded-none data-[state=active]:bg-white/10 text-white/70 data-[state=active]:text-white py-2.5"
            >
              Enter Text
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                {error}
              </div>
            )}

            <div className="w-full">
              <TabsContent 
                value="upload" 
                className="m-0"
              >
                <div 
                  onClick={handleUploadClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="w-full border-2 border-dashed border-white/20 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:border-white/40 transition-colors"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.txt"
                    className="hidden"
                  />
                  <Upload className="text-white/60 mb-4 h-12 w-12" />
                  {selectedFile ? (
                    <div className="text-center">
                      <p className="text-white/80">Selected file:</p>
                      <p className="text-white font-medium">{selectedFile.name}</p>
                      <p className="text-white/60 text-sm mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-white/80">Drag and drop your file here, or click to browse</p>
                      <p className="text-white/60 text-sm mt-2">pdf, txt files only (Max Limit 10 MB)</p>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent 
                value="text" 
                className="m-0"
              >
                <Textarea 
                  placeholder="Enter your text here..." 
                  className="w-full min-h-[200px] bg-white/5 border-white/20 text-white"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </TabsContent>
            </div>

            <div className="mt-4 space-y-4">
              {isProcessing && (
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-white/80 transition-all duration-300 ease-in-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              <Button 
                onClick={handleSummarize}
                className="w-full bg-white/20 hover:bg-white/30 text-white"
                disabled={isProcessing || (!selectedFile && !inputText.trim())}
              >
                {isProcessing ? 'Summarizing...' : 'Summarize'}
              </Button>
            </div>
          </div>
        </Tabs>
      </Card>

      {summary && (
        <Card className="w-[600px] mx-auto backdrop-blur-md bg-white/10 border-white/20 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-white">Summary</h2>
              <div className="flex items-center gap-2">
                <CopyButton text={summary} />
                <Button
                  onClick={handleReset}
                  variant="ghost"
                  size="icon"
                  className="text-white/70 hover:text-white hover:bg-white/10"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-lg text-white/90">
              {summary}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SummarizerCard;