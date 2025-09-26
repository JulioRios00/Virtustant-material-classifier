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
exports.DataProcessorService = void 0;
const common_1 = require("@nestjs/common");
const hazardous_classifier_service_1 = require("./hazardous-classifier.service");
let DataProcessorService = class DataProcessorService {
    constructor(hazardousClassifier) {
        this.hazardousClassifier = hazardousClassifier;
        this.MAX_CONCURRENT_REQUESTS = 100;
    }
    async processBatch(bookings) {
        const processedBookings = [];
        for (let i = 0; i < bookings.length; i += this.MAX_CONCURRENT_REQUESTS) {
            const batch = bookings.slice(i, i + this.MAX_CONCURRENT_REQUESTS);
            const batchPromises = batch.map(async (booking) => {
                try {
                    const classification = await this.hazardousClassifier.classify(booking);
                    return {
                        ...booking,
                        isHazardous: classification.isHazardous,
                        confidence: classification.confidence,
                    };
                }
                catch (error) {
                    console.error(`Error processing booking ${booking.id}:`, error);
                    return {
                        ...booking,
                        isHazardous: false,
                        confidence: 0,
                    };
                }
            });
            const processedBatch = await Promise.all(batchPromises);
            processedBookings.push(...processedBatch);
            if (i + this.MAX_CONCURRENT_REQUESTS < bookings.length) {
                await this.delay(1000);
            }
        }
        return processedBookings;
    }
    async updateBooking(id, data) {
        const updateData = (id, data) => {
            return true;
        };
        return updateData(id, data);
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async processLargeDataset(bookings) {
        let processed = 0;
        let errors = 0;
        let hazardous = 0;
        let nonHazardous = 0;
        const results = await this.processBatch(bookings);
        for (const result of results) {
            if (result.confidence !== undefined) {
                processed++;
                if (result.isHazardous) {
                    hazardous++;
                }
                else {
                    nonHazardous++;
                }
                await this.updateBooking(result.id, {
                    isHazardous: result.isHazardous,
                    confidence: result.confidence,
                });
            }
            else {
                errors++;
            }
        }
        return { processed, errors, hazardous, nonHazardous };
    }
};
exports.DataProcessorService = DataProcessorService;
exports.DataProcessorService = DataProcessorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [hazardous_classifier_service_1.HazardousClassifierService])
], DataProcessorService);
//# sourceMappingURL=data-processor.service.js.map