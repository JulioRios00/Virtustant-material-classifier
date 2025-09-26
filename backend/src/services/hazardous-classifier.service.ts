import { Injectable } from "@nestjs/common";
import {
  IHazardousClassifier,
  ITextAnalyzer,
  IProductAnalyzer,
} from "../interfaces/classifier.interface";
import {
  IBooking,
  IClassificationResult,
} from "../interfaces/booking.interface";
import { TextAnalyzerService } from "./text-analyzer.service";
import { ProductAnalyzerService } from "./product-analyzer.service";

@Injectable()
export class HazardousClassifierService implements IHazardousClassifier {
  constructor(
    private readonly textAnalyzer: TextAnalyzerService,
    private readonly productAnalyzer: ProductAnalyzerService
  ) {}

  async classify(booking: IBooking): Promise<IClassificationResult> {
    const descriptionAnalysis = await this.textAnalyzer.analyzeText(
      booking.description
    );

    let notesAnalysis = { isHazardous: false, confidence: 0, keywords: [] };
    if (booking.internalNotes) {
      notesAnalysis = await this.textAnalyzer.analyzeText(
        booking.internalNotes
      );
    }

    const productAnalysis = await this.productAnalyzer.analyzeProducts(
      booking.products
    );

    const weights = {
      description: 0.4,
      products: 0.45,
      notes: 0.15,
    };

    const combinedScore =
      descriptionAnalysis.confidence * weights.description +
      productAnalysis.confidence * weights.products +
      notesAnalysis.confidence * weights.notes;

    const isHazardousFromText =
      descriptionAnalysis.isHazardous || notesAnalysis.isHazardous;
    const isHazardousFromProducts = productAnalysis.isHazardous;
    const isHazardousFromCombined = combinedScore > 0.4;

    const isHazardous =
      isHazardousFromText || isHazardousFromProducts || isHazardousFromCombined;

    const reasons: string[] = [];

    if (descriptionAnalysis.isHazardous) {
      reasons.push(
        `Description contains hazardous keywords: ${descriptionAnalysis.keywords.join(", ")}`
      );
    }

    if (notesAnalysis.isHazardous) {
      reasons.push(
        `Internal notes contain hazardous keywords: ${notesAnalysis.keywords.join(", ")}`
      );
    }

    if (productAnalysis.isHazardous) {
      reasons.push(
        `Products identified as hazardous: ${productAnalysis.hazardousProducts.join(", ")}`
      );
    }

    if (isHazardousFromCombined && reasons.length === 0) {
      reasons.push("Combined analysis indicates potential hazardous materials");
    }

    const finalConfidence = Math.min(
      Math.max(
        descriptionAnalysis.confidence,
        productAnalysis.confidence,
        notesAnalysis.confidence
      ),
      Math.max(combinedScore, 0.9)
    );

    return {
      isHazardous,
      confidence: parseFloat(finalConfidence.toFixed(3)),
      reasons,
      timestamp: new Date(),
    };
  }
}
