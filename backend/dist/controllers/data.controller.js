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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const data_processor_service_1 = require("../services/data-processor.service");
const booking_model_1 = require("../models/booking.model");
let DataController = class DataController {
    constructor(dataProcessor) {
        this.dataProcessor = dataProcessor;
    }
    async backfillData(body) {
        try {
            const startTime = Date.now();
            const bookings = body.bookings.map((dto) => booking_model_1.Booking.fromDto(dto));
            const results = await this.dataProcessor.processLargeDataset(bookings);
            const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);
            return {
                ...results,
                processingTime: `${processingTime} seconds`,
            };
        }
        catch (error) {
            throw new common_1.HttpException(`Backfill processing failed: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getStatus() {
        return {
            status: "operational",
            maxConcurrentRequests: 100,
            rateLimit: "100 requests per second",
        };
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Post)("backfill"),
    (0, swagger_1.ApiOperation)({
        summary: "Backfill existing bookings with hazardous material classification",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Backfill processing results",
        schema: {
            type: "object",
            properties: {
                processed: { type: "number" },
                errors: { type: "number" },
                hazardous: { type: "number" },
                nonHazardous: { type: "number" },
                processingTime: { type: "string" },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DataController.prototype, "backfillData", null);
__decorate([
    (0, common_1.Get)("status"),
    (0, swagger_1.ApiOperation)({ summary: "Get data processing status" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Current system status",
        schema: {
            type: "object",
            properties: {
                status: { type: "string" },
                maxConcurrentRequests: { type: "number" },
                rateLimit: { type: "string" },
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DataController.prototype, "getStatus", null);
exports.DataController = DataController = __decorate([
    (0, swagger_1.ApiTags)("Data Processing"),
    (0, common_1.Controller)("api/data"),
    __metadata("design:paramtypes", [data_processor_service_1.DataProcessorService])
], DataController);
//# sourceMappingURL=data.controller.js.map