import { IBooking, IClassificationResult } from "./booking.interface";
export interface IHazardousClassifier {
    classify(booking: IBooking): Promise<IClassificationResult>;
}
export interface ITextAnalyzer {
    analyzeText(text: string): Promise<{
        isHazardous: boolean;
        confidence: number;
        keywords: string[];
    }>;
}
export interface IProductAnalyzer {
    analyzeProducts(products: string[]): Promise<{
        isHazardous: boolean;
        confidence: number;
        hazardousProducts: string[];
    }>;
}
export interface IDataProcessor {
    processBatch(bookings: IBooking[]): Promise<IBooking[]>;
    updateBooking(id: string, data: Partial<IBooking>): Promise<boolean>;
}
