// app/lib/actions.ts
'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse/lib/pdf-parse.js';
import { parseDocument } from './fileUtils';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function summarizeContent(content: string) {
  try {
    // For safety, trim and check content length
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      throw new Error('No content provided to summarize');
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate the summary
    const prompt = `Please provide a concise summary of the following text:\n\n${trimmedContent}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return summary;
  } catch (error) {
    console.error('Error in summarizeContent:', error);
    throw new Error('Failed to generate summary');
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  try {
    const text = await parseDocument(file);
    return text;
  } catch (error) {
    console.error('Error in extractTextFromFile:', error);
    throw new Error('Failed to extract text from file');
  }
}