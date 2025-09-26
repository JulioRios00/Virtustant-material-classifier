import { IBooking, IClassificationResult } from "../interfaces/booking.interface";
export declare class Booking implements IBooking {
    id: string;
    customerName: string;
    appointmentDate: Date;
    description: string;
    products: string[];
    companyName?: string;
    internalNotes?: string;
    isHazardous?: boolean;
    confidence?: number;
    constructor(id: string, customerName: string, appointmentDate: Date, description: string, products: string[], companyName?: string, internalNotes?: string, isHazardous?: boolean, confidence?: number);
    static fromDto(dto: any): Booking;
    toJson(): {
        id: string;
        customerName: string;
        companyName: string;
        appointmentDate: Date;
        description: string;
        products: string[];
        internalNotes: string;
        isHazardous: boolean;
        confidence: number;
    };
}
export declare class ClassificationResult implements IClassificationResult {
    bookingId: string;
    isHazardous: boolean;
    confidence: number;
    reasons: string[];
    timestamp: Date;
    constructor(bookingId: string, isHazardous: boolean, confidence: number, reasons: string[], timestamp?: Date);
}
