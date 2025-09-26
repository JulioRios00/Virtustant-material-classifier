import { IDataProcessor } from "../interfaces/classifier.interface";
import { IBooking } from "../interfaces/booking.interface";
import { HazardousClassifierService } from "./hazardous-classifier.service";
export declare class DataProcessorService implements IDataProcessor {
    private readonly hazardousClassifier;
    private readonly MAX_CONCURRENT_REQUESTS;
    constructor(hazardousClassifier: HazardousClassifierService);
    processBatch(bookings: IBooking[]): Promise<IBooking[]>;
    updateBooking(id: string, data: Partial<IBooking>): Promise<boolean>;
    private delay;
    processLargeDataset(bookings: IBooking[]): Promise<{
        processed: number;
        errors: number;
        hazardous: number;
        nonHazardous: number;
    }>;
}
