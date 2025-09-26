import { DataProcessorService } from "../services/data-processor.service";
import { BookingDto } from "../dto/booking.dto";
export declare class DataController {
    private readonly dataProcessor;
    constructor(dataProcessor: DataProcessorService);
    backfillData(body: {
        bookings: BookingDto[];
    }): Promise<{
        processingTime: string;
        processed: number;
        errors: number;
        hazardous: number;
        nonHazardous: number;
    }>;
    getStatus(): {
        status: string;
        maxConcurrentRequests: number;
        rateLimit: string;
    };
}
