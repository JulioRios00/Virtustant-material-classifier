export interface IBooking {
  id: string;
  customerName: string;
  companyName?: string;
  appointmentDate: Date;
  description: string;
  products: string[];
  internalNotes?: string;
  isHazardous?: boolean;
  confidence?: number;
}

export interface IBookingClassification {
  bookingId: string;
  isHazardous: boolean;
  confidence: number;
  reasons: string[];
  timestamp: Date;
}

export interface IClassificationResult {
  isHazardous: boolean;
  confidence: number;
  reasons: string[];
  timestamp?: Date;
}
