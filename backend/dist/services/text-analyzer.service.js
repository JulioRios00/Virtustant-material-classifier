"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAnalyzerService = void 0;
const common_1 = require("@nestjs/common");
let TextAnalyzerService = class TextAnalyzerService {
    constructor() {
        this.hazardousKeywords = [
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
        this.contextualPhrases = [
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
    }
    async analyzeText(text) {
        const normalizedText = text.toLowerCase();
        const foundKeywords = [];
        let score = 0;
        this.hazardousKeywords.forEach((keyword) => {
            if (normalizedText.includes(keyword)) {
                foundKeywords.push(keyword);
                score += this.getKeywordWeight(keyword);
            }
        });
        const hasDisposalContext = this.contextualPhrases.some((phrase) => normalizedText.includes(phrase));
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
                    const substanceCheck = this.hazardousKeywords.some((keyword) => match.includes(keyword));
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
    getKeywordWeight(keyword) {
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
        if (highRisk.includes(keyword))
            return 0.8;
        if (mediumRisk.includes(keyword))
            return 0.5;
        return 0.3;
    }
};
exports.TextAnalyzerService = TextAnalyzerService;
exports.TextAnalyzerService = TextAnalyzerService = __decorate([
    (0, common_1.Injectable)()
], TextAnalyzerService);
//# sourceMappingURL=text-analyzer.service.js.map