"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAnalyzerService = void 0;
const common_1 = require("@nestjs/common");
let ProductAnalyzerService = class ProductAnalyzerService {
    constructor() {
        this.hazardousProducts = new Map([
            ["Computer/Laptop", 0.6],
            ["Television", 0.6],
            ["Monitor/Display", 0.6],
            ["Printer/Scanner", 0.5],
            ["Phone/Mobile Device", 0.4],
            ["Gaming Console", 0.5],
            ["Electronic Components", 0.7],
            ["Refrigerator", 0.8],
            ["Air Conditioner", 0.9],
            ["Washing Machine", 0.4],
            ["Dryer", 0.3],
            ["Microwave", 0.3],
            ["Dishwasher", 0.3],
            ["Car Battery", 0.95],
            ["Motor Oil", 0.9],
            ["Antifreeze", 0.9],
            ["Brake Fluid", 0.9],
            ["Transmission Fluid", 0.8],
            ["Car Parts", 0.6],
            ["Tires", 0.4],
            ["Paint/Stain", 0.85],
            ["Paint Thinner", 0.95],
            ["Cleaning Chemicals", 0.7],
            ["Pesticides", 0.95],
            ["Fertilizer", 0.6],
            ["Pool Chemicals", 0.8],
            ["Fluorescent Bulbs", 0.8],
            ["CFL Bulbs", 0.8],
            ["LED Bulbs", 0.3],
            ["Light Fixtures", 0.4],
            ["Medical Equipment", 0.7],
            ["Medications", 0.8],
            ["Syringes/Needles", 0.9],
            ["Asbestos Materials", 1.0],
            ["Insulation", 0.6],
            ["Roofing Materials", 0.5],
            ["Construction Debris", 0.4],
            ["Furniture", 0.1],
            ["Clothing/Textiles", 0.05],
            ["Books/Paper", 0.05],
            ["Plastic Items", 0.1],
            ["Metal Scrap", 0.2],
            ["Garden Waste", 0.05],
            ["Food Waste", 0.05],
        ]);
    }
    async analyzeProducts(products) {
        if (!products || products.length === 0) {
            return {
                isHazardous: false,
                confidence: 0,
                hazardousProducts: [],
            };
        }
        let totalHazardScore = 0;
        let maxIndividualScore = 0;
        const hazardousProducts = [];
        for (const product of products) {
            const score = this.getProductHazardScore(product);
            if (score > 0.3) {
                hazardousProducts.push(product);
                totalHazardScore += score;
                maxIndividualScore = Math.max(maxIndividualScore, score);
            }
        }
        const averageHazardScore = totalHazardScore / products.length;
        const confidence = Math.min(maxIndividualScore * 0.7 + averageHazardScore * 0.3, 1.0);
        const isHazardous = maxIndividualScore > 0.7 ||
            (hazardousProducts.length >= 2 && confidence > 0.4) ||
            confidence > 0.5;
        return {
            isHazardous,
            confidence,
            hazardousProducts,
        };
    }
    getProductHazardScore(product) {
        if (this.hazardousProducts.has(product)) {
            return this.hazardousProducts.get(product);
        }
        const productLower = product.toLowerCase();
        for (const [hazardousProduct, score] of this.hazardousProducts.entries()) {
            const hazardousLower = hazardousProduct.toLowerCase();
            const hazardousTerms = hazardousLower.split(/[/\s-]+/);
            const productTerms = productLower.split(/[/\s-]+/);
            const matchingTerms = hazardousTerms.filter((term) => productTerms.some((pTerm) => pTerm.includes(term) || term.includes(pTerm)));
            if (matchingTerms.length > 0) {
                const matchRatio = matchingTerms.length / hazardousTerms.length;
                return score * matchRatio * 0.8;
            }
        }
        return 0;
    }
};
exports.ProductAnalyzerService = ProductAnalyzerService;
exports.ProductAnalyzerService = ProductAnalyzerService = __decorate([
    (0, common_1.Injectable)()
], ProductAnalyzerService);
//# sourceMappingURL=product-analyzer.service.js.map