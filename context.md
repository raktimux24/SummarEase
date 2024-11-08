# Text Summarizer Application Documentation

## Overview
Text Summarizer is a modern web application that leverages Google's Gemini AI to generate concise summaries from various text inputs. The application features a sleek, glass-morphic design with a purple gradient theme.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - shadcn/ui components
- **AI Integration**: Google Gemini API
- **Icons**: Lucide React

## Features

### 1. Text Input Methods
#### File Upload
- Supports multiple file formats:
  - PDF (.pdf)
  - Microsoft Word (.doc, .docx)
  - Text files (.txt)
- Drag and drop functionality
- Click to browse option
- File size display
- Visual feedback during upload

#### Direct Text Input
- Large text area for direct input
- Placeholder text guidance
- Auto-resizing capability

### 2. Summarization Process
- Progress indication
- Real-time feedback
- Error handling
- Loading states

### 3. UI Components

#### Header
```typescript
Components:
- Logo (BookOpenText icon from Lucide)
- Application title
Styling:
- Glass effect (backdrop-blur-md)
- Semi-transparent background (bg-white/5)
- Subtle border (border-white/10)
- Padding: p-6
```

#### Main Content Card
```typescript
Dimensions:
- Width: 600px
- Height: Auto-adjusting

Tab Navigation:
- "Upload a File"
- "Enter Text"

Styling:
- Glass effect background
- Rounded corners
- White borders with 20% opacity
- Hover effects on interactive elements
```

#### Summary Output Card
```typescript
Visibility:
- Appears after summarization
Styling:
- Matches input card design
- Distinct summary section
- Proper text contrast
```

#### Footer
```typescript
Content:
- "Powered by Google Gemini" text
Styling:
- Glass effect
- Subtle opacity
- Consistent padding with header
```

## Design Specifications

### Color Palette
```css
Background Gradient:
- From: #2D0A5E (Deep Purple)
- Via:  #4A1173 (Rich Purple)
- To:   #6B0B4E (Deep Magenta)

UI Elements:
- Text: white with varying opacity
- Borders: white with 10-20% opacity
- Active elements: white with 15-30% opacity
```

### Typography
```css
Headings:
- Font: System default
- Weight: Bold
- Size: 24px (2xl)

Body Text:
- Font: System default
- Weight: Regular
- Size: 16px (base)

Button Text:
- Weight: Medium
- Transform: None
```

### Spacing
```css
Layout:
- Page padding: 24px (p-6)
- Card padding: 24px (p-6)
- Element spacing: 16px (space-y-4)
- Component gaps: 12px (gap-3)
```

### Interactive States
```css
Buttons:
- Default: bg-white/20
- Hover: bg-white/30
- Disabled: opacity-50

Tab Triggers:
- Default: text-white/70
- Active: text-white, bg-white/10

Upload Area:
- Default: border-white/20
- Hover: border-white/40
- Drag Over: border-white/60
```

## Responsive Behavior
- Center-aligned content
- Fixed width cards on desktop
- Maintained aspect ratios
- Flexible height based on content

## Performance Considerations
- Lazy loading of components
- Optimized file handling
- Smooth transitions
- Progressive loading states

## Accessibility
- High contrast text
- Clear focus states
- Semantic HTML structure
- ARIA labels where necessary

## Future Enhancements
1. Character/word count display
2. Copy to clipboard functionality
3. Download summary option
4. History of summarizations
5. Multiple language support
6. Customizable summary length
7. Save summaries to user account
8. Share summary functionality

## Installation and Setup
1. Clone repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install shadcn components:
   ```bash
   npx shadcn-ui@latest add card
   npx shadcn-ui@latest add tabs
   npx shadcn-ui@latest add textarea
   npx shadcn-ui@latest add button
   ```
4. Set up environment variables:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   ```
5. Run development server:
   ```bash
   npm run dev
   ```

## API Integration
Configure Google Gemini API in your environment variables and implement summarization logic in server actions for secure API key handling.