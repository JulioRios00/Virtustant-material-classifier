import { IProductAnalyzer } from "../interfaces/classifier.interface";
export declare class ProductAnalyzerService implements IProductAnalyzer {
    private readonly hazardousProducts;
    analyzeProducts(products: string[]): Promise<{
        isHazardous: boolean;
        confidence: number;
        hazardousProducts: string[];
    }>;
    private getProductHazardScore;
}
