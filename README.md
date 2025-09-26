# Material Classifier

Full-stack application for classifying junk disposal bookings to identify potential hazardous materials, built with NestJS backend and React frontend following MVC architecture with SOLID principles.

## Architecture Overview

### Backend (NestJS)

### Frontend (React + Tailwind)

## Features

### Part 1: Single Booking Classification
- **Lightweight API** for single booking classification
- **Multi-factor analysis**:
  - Text analysis of descriptions and internal notes
  - Product-based risk assessment  
  - Weighted scoring system
- **High accuracy** targeting >90% success rate
- **Real-time classification** with confidence scores

### Part 2: Batch Processing
- **Backfill capability** for 100,000+ records
- **Rate limiting** compliance (100 API calls/second)
- **Efficient processing** with concurrent batch handling
- **Progress tracking** and error handling

### Part 3: User Interface
- **Booking overview table** with hazardous status indicators
- **Detailed booking view** with full classification results
- **Manual classification form** for new bookings
- **Batch processing interface** for existing data
- **Real-time statistics** dashboard

## Classification Logic

### Text Analysis
- **Keyword matching** against hazardous materials database
- **Contextual analysis** for disposal-related terms
- **Pattern recognition** for quantities and substances
- **Weighted scoring** based on risk levels

### Product Analysis  
- **Product mapping** to hazard risk scores
- **Fuzzy matching** for product name variations
- **Cumulative risk assessment** for multiple items
- **Category-based classification**

### Combined Classification
- **Multi-factor scoring** (40% description, 45% products, 15% notes)
- **Confidence thresholds** for hazardous determination
- **Reason tracking** for transparency
- **Uncertainty handling** with confidence intervals

## API Endpoints

### Classification
- `POST /api/classify/single` - Classify single booking
- `POST /api/classify/batch` - Classify multiple bookings

### Data Processing
- `POST /api/data/backfill` - Backfill existing records
- `GET /api/data/status` - Get system status

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

The backend will run on `http://localhost:3001`
API documentation available at `http://localhost:3001/api/docs`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

## Performance Considerations

### Rate Limiting
- Implements 100 requests/second limit as specified
- Batch processing with 1-second intervals
- Concurrent processing within rate limits

### Scalability
- Stateless API design
- Efficient batch processing
- Memory-conscious data handling
- Database-agnostic architecture (ready for real DB integration)

## Testing the System

### Manual Testing
1. Use the "Classify New Booking" tab to test individual bookings
2. Try different combinations of descriptions and products
3. Observe confidence scores and reasoning

### Batch Testing
1. Use the "Batch Processing" tab to process sample data
2. Monitor processing time and accuracy
3. View updated classifications in the overview table

### API Testing
- Swagger documentation at `/api/docs`
- Test endpoints with various payloads
- Monitor response times and accuracy

## Technology Stack

### Backend
- **NestJS** - Node.js framework with decorators
- **TypeScript** - Type safety and modern JavaScript features
- **Class Validator** - DTO validation
- **Swagger** - API documentation
- **Natural Language Processing** - Text analysis libraries

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type safety in frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Date-fns** - Date formatting utilities
- **Axios** - HTTP client for API calls


