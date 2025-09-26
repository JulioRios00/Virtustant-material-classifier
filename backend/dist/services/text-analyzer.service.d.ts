import { ITextAnalyzer } from "../interfaces/classifier.interface";
export declare class TextAnalyzerService implements ITextAnalyzer {
    private readonly hazardousKeywords;
    private readonly contextualPhrases;
    analyzeText(text: string): Promise<{
        isHazardous: boolean;
        confidence: number;
        keywords: string[];
    }>;
    private getKeywordWeight;
}
