"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HazardousClassifierService = void 0;
const common_1 = require("@nestjs/common");
const text_analyzer_service_1 = require("./text-analyzer.service");
const product_analyzer_service_1 = require("./product-analyzer.service");
let HazardousClassifierService = class HazardousClassifierService {
    constructor(textAnalyzer, productAnalyzer) {
        this.textAnalyzer = textAnalyzer;
        this.productAnalyzer = productAnalyzer;
    }
    async classify(booking) {
        const descriptionAnalysis = await this.textAnalyzer.analyzeText(booking.description);
        let notesAnalysis = { isHazardous: false, confidence: 0, keywords: [] };
        if (booking.internalNotes) {
            notesAnalysis = await this.textAnalyzer.analyzeText(booking.internalNotes);
        }
        const productAnalysis = await this.productAnalyzer.analyzeProducts(booking.products);
        const weights = {
            description: 0.4,
            products: 0.45,
            notes: 0.15,
        };
        const combinedScore = descriptionAnalysis.confidence * weights.description +
            productAnalysis.confidence * weights.products +
            notesAnalysis.confidence * weights.notes;
        const isHazardousFromText = descriptionAnalysis.isHazardous || notesAnalysis.isHazardous;
        const isHazardousFromProducts = productAnalysis.isHazardous;
        const isHazardousFromCombined = combinedScore > 0.4;
        const isHazardous = isHazardousFromText || isHazardousFromProducts || isHazardousFromCombined;
        const reasons = [];
        if (descriptionAnalysis.isHazardous) {
            reasons.push(`Description contains hazardous keywords: ${descriptionAnalysis.keywords.join(", ")}`);
        }
        if (notesAnalysis.isHazardous) {
            reasons.push(`Internal notes contain hazardous keywords: ${notesAnalysis.keywords.join(", ")}`);
        }
        if (productAnalysis.isHazardous) {
            reasons.push(`Products identified as hazardous: ${productAnalysis.hazardousProducts.join(", ")}`);
        }
        if (isHazardousFromCombined && reasons.length === 0) {
            reasons.push("Combined analysis indicates potential hazardous materials");
        }
        const finalConfidence = Math.min(Math.max(descriptionAnalysis.confidence, productAnalysis.confidence, notesAnalysis.confidence), Math.max(combinedScore, 0.9));
        return {
            isHazardous,
            confidence: parseFloat(finalConfidence.toFixed(3)),
            reasons,
            timestamp: new Date(),
        };
    }
};
exports.HazardousClassifierService = HazardousClassifierService;
exports.HazardousClassifierService = HazardousClassifierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [text_analyzer_service_1.TextAnalyzerService,
        product_analyzer_service_1.ProductAnalyzerService])
], HazardousClassifierService);
//# sourceMappingURL=hazardous-classifier.service.js.map