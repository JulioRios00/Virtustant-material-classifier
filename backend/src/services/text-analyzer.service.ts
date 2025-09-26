import { Injectable } from "@nestjs/common";
import { ITextAnalyzer } from "../interfaces/classifier.interface";

@Injectable()
export class TextAnalyzerService implements ITextAnalyzer {
  private readonly hazardousKeywords = [
    "acid",
    "alkali",
    "bleach",
    "ammonia",
    "pesticide",
    "herbicide",
    "insecticide",
    "paint",
    "thinner",
    "solvent",
    "gasoline",
    "diesel",
    "oil",
    "battery",
    "asbestos",
    "lead",
    "mercury",
    "cadmium",
    "chromium",
    "computer",
    "monitor",
    "tv",
    "television",
    "electronic",
    "fluorescent",
    "crt",
    "lcd",
    "led",
    "bulb",
    "tube",
    "capacitor",
    "medical",
    "pharmaceutical",
    "syringe",
    "needle",
    "medication",
    "drug",
    "prescription",
    "radioactive",
    "x-ray",
    "brake fluid",
    "antifreeze",
    "motor oil",
    "transmission fluid",
    "hydraulic fluid",
    "coolant",
    "refrigerant",
    "freon",
    "toxic",
    "poisonous",
    "flammable",
    "corrosive",
    "explosive",
    "radioactive",
    "hazardous",
    "dangerous",
    "chemical",
  ];

  private readonly contextualPhrases = [
    "dispose of",
    "get rid of",
    "throw away",
    "old",
    "broken",
    "expired",
    "leaking",
    "damaged",
    "unused",
    "leftover",
  ];

  async analyzeText(text: string): Promise<{
    isHazardous: boolean;
    confidence: number;
    keywords: string[];
  }> {
    const normalizedText = text.toLowerCase();
    const foundKeywords: string[] = [];
    let score = 0;

    this.hazardousKeywords.forEach((keyword) => {
      if (normalizedText.includes(keyword)) {
        foundKeywords.push(keyword);
        score += this.getKeywordWeight(keyword);
      }
    });

    const hasDisposalContext = this.contextualPhrases.some((phrase) =>
      normalizedText.includes(phrase)
    );

    if (hasDisposalContext && foundKeywords.length > 0) {
      score *= 1.3;
    }

    const quantityPatterns = [
      /(\d+)\s*(gallon|liter|bottle|container|can|drum|tank)s?\s*(of\s*)?([a-z\s]+)/gi,
      /(\d+)\s*(lb|pound|kg|kilogram)s?\s*(of\s*)?([a-z\s]+)/gi,
    ];

    quantityPatterns.forEach((pattern) => {
      const matches = normalizedText.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          const substanceCheck = this.hazardousKeywords.some((keyword) =>
            match.includes(keyword)
          );
          if (substanceCheck) {
            score += 0.3;
          }
        });
      }
    });

    const maxPossibleScore = 3.0;
    const confidence = Math.min(score / maxPossibleScore, 1.0);

    const isHazardous = confidence > 0.15;

    return {
      isHazardous,
      confidence,
      keywords: foundKeywords,
    };
  }

  private getKeywordWeight(keyword: string): number {
    const highRisk = [
      "asbestos",
      "lead",
      "mercury",
      "radioactive",
      "toxic",
      "poisonous",
      "explosive",
      "acid",
      "alkali",
      "pesticide",
    ];

    const mediumRisk = [
      "paint",
      "battery",
      "gasoline",
      "oil",
      "bleach",
      "ammonia",
      "fluorescent",
      "electronic",
      "medical",
    ];

    if (highRisk.includes(keyword)) return 0.8;
    if (mediumRisk.includes(keyword)) return 0.5;
    return 0.3;
  }
}
