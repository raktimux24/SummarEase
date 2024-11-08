// app/lib/fileUtils.ts
import mammoth from 'mammoth';
import pdf from 'pdf-parse/lib/pdf-parse.js';

export const validateFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'text/plain'
    ];
  
    const validExtensions = ['.pdf', '.txt'];
    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  
    if (!validTypes.includes(file.type) && !validExtensions.includes(extension)) {
      throw new Error('Invalid file type. Please upload a PDF or TXT file.');
    }
  
    // Check file size (e.g., 10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_SIZE) {
      throw new Error('File size too large. Please upload a file smaller than 10MB.');
    }
  
    return true;
  };
  
  export const getFileTypeIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().slice(fileName.lastIndexOf('.'));
    switch (extension) {
      case '.pdf':
        return '📄';
      case '.txt':
        return '📃';
      default:
        return '📄';
    }
  };
  
  export async function parseDocument(file: File): Promise<string> {
    const fileType = file.type;
    const extension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
  
    try {
      // Get array buffer from file
      const arrayBuffer = await file.arrayBuffer();
      
      // Handle PDF files
      if (fileType === 'application/pdf' || extension === '.pdf') {
        try {
          const uint8Array = new Uint8Array(arrayBuffer);
          const data = await pdf(uint8Array);
          if (!data || !data.text) {
            throw new Error('No text content found in the PDF');
          }
          return data.text;
        } catch (pdfError) {
          console.error('PDF error:', pdfError);
          throw new Error('Failed to parse PDF file');
        }
      }

      // Handle text files
      if (fileType === 'text/plain' || extension === '.txt') {
        return await file.text();
      }

      throw new Error('Unsupported file type');
    } catch (error) {
      console.error('Document parsing error:', error);
      throw error;
    }
  }