export interface Booking {
  id: string;
  customerName: string;
  companyName?: string;
  appointmentDate: string | Date;
  description: string;
  products: string[];
  internalNotes?: string;
  isHazardous?: boolean;
  confidence?: number;
}

export interface ClassificationResult {
  bookingId: string;
  isHazardous: boolean;
  confidence: number;
  reasons: string[];
  timestamp?: string;
}

export interface BatchClassificationResult {
  results: ClassificationResult[];
  summary: {
    total: number;
    hazardous: number;
    nonHazardous: number;
    avgConfidence: number;
  };
}

export interface BackfillResult {
  processed: number;
  errors: number;
  hazardous: number;
  nonHazardous: number;
  processingTime: string;
}
