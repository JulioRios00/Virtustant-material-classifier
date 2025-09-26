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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const hazardous_classifier_service_1 = require("../services/hazardous-classifier.service");
const data_processor_service_1 = require("../services/data-processor.service");
const booking_dto_1 = require("../dto/booking.dto");
const booking_model_1 = require("../models/booking.model");
let ClassificationController = class ClassificationController {
    constructor(hazardousClassifier, dataProcessor) {
        this.hazardousClassifier = hazardousClassifier;
        this.dataProcessor = dataProcessor;
    }
    async classifySingle(bookingDto) {
        try {
            const booking = booking_model_1.Booking.fromDto(bookingDto);
            const result = await this.hazardousClassifier.classify(booking);
            return {
                bookingId: booking.id,
                ...result,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Classification failed: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async classifyBatch(batchDto) {
        try {
            const bookings = batchDto.bookings.map((dto) => booking_model_1.Booking.fromDto(dto));
            const results = [];
            let hazardousCount = 0;
            let totalConfidence = 0;
            for (const booking of bookings) {
                const classification = await this.hazardousClassifier.classify(booking);
                results.push({
                    bookingId: booking.id,
                    ...classification,
                });
                if (classification.isHazardous) {
                    hazardousCount++;
                }
                totalConfidence += classification.confidence;
            }
            return {
                results,
                summary: {
                    total: bookings.length,
                    hazardous: hazardousCount,
                    nonHazardous: bookings.length - hazardousCount,
                    avgConfidence: parseFloat((totalConfidence / bookings.length).toFixed(3)),
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Batch classification failed: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ClassificationController = ClassificationController;
__decorate([
    (0, common_1.Post)("single"),
    (0, swagger_1.ApiOperation)({
        summary: "Classify a single booking for hazardous materials",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Classification result",
        schema: {
            type: "object",
            properties: {
                bookingId: { type: "string" },
                isHazardous: { type: "boolean" },
                confidence: { type: "number" },
                reasons: { type: "array", items: { type: "string" } },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.ClassifyBookingDto]),
    __metadata("design:returntype", Promise)
], ClassificationController.prototype, "classifySingle", null);
__decorate([
    (0, common_1.Post)("batch"),
    (0, swagger_1.ApiOperation)({
        summary: "Classify multiple bookings for hazardous materials",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Batch classification results",
        schema: {
            type: "object",
            properties: {
                results: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            bookingId: { type: "string" },
                            isHazardous: { type: "boolean" },
                            confidence: { type: "number" },
                            reasons: { type: "array", items: { type: "string" } },
                        },
                    },
                },
                summary: {
                    type: "object",
                    properties: {
                        total: { type: "number" },
                        hazardous: { type: "number" },
                        nonHazardous: { type: "number" },
                        avgConfidence: { type: "number" },
                    },
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [booking_dto_1.BatchClassifyDto]),
    __metadata("design:returntype", Promise)
], ClassificationController.prototype, "classifyBatch", null);
exports.ClassificationController = ClassificationController = __decorate([
    (0, swagger_1.ApiTags)("Classification"),
    (0, common_1.Controller)("api/classify"),
    __metadata("design:paramtypes", [hazardous_classifier_service_1.HazardousClassifierService,
        data_processor_service_1.DataProcessorService])
], ClassificationController);
//# sourceMappingURL=classification.controller.js.map