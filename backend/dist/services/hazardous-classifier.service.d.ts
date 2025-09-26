import { IHazardousClassifier } from "../interfaces/classifier.interface";
import { IBooking, IClassificationResult } from "../interfaces/booking.interface";
import { TextAnalyzerService } from "./text-analyzer.service";
import { ProductAnalyzerService } from "./product-analyzer.service";
export declare class HazardousClassifierService implements IHazardousClassifier {
    private readonly textAnalyzer;
    private readonly productAnalyzer;
    constructor(textAnalyzer: TextAnalyzerService, productAnalyzer: ProductAnalyzerService);
    classify(booking: IBooking): Promise<IClassificationResult>;
}
