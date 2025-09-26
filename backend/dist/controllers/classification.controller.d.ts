import { HazardousClassifierService } from "../services/hazardous-classifier.service";
import { DataProcessorService } from "../services/data-processor.service";
import { ClassifyBookingDto, BatchClassifyDto } from "../dto/booking.dto";
export declare class ClassificationController {
    private readonly hazardousClassifier;
    private readonly dataProcessor;
    constructor(hazardousClassifier: HazardousClassifierService, dataProcessor: DataProcessorService);
    classifySingle(bookingDto: ClassifyBookingDto): Promise<{
        isHazardous: boolean;
        confidence: number;
        reasons: string[];
        timestamp?: Date;
        bookingId: string;
    }>;
    classifyBatch(batchDto: BatchClassifyDto): Promise<{
        results: any[];
        summary: {
            total: number;
            hazardous: number;
            nonHazardous: number;
            avgConfidence: number;
        };
    }>;
}
