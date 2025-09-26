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
exports.BatchClassifyDto = exports.ClassifyBookingDto = exports.BookingDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class BookingDto {
}
exports.BookingDto = BookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique booking identifier" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDto.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Company name", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookingDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Appointment date" }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BookingDto.prototype, "appointmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description of items to be disposed" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BookingDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "List of products from dropdown selections" }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], BookingDto.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Internal notes", required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BookingDto.prototype, "internalNotes", void 0);
class ClassifyBookingDto extends BookingDto {
}
exports.ClassifyBookingDto = ClassifyBookingDto;
class BatchClassifyDto {
}
exports.BatchClassifyDto = BatchClassifyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Array of bookings to classify",
        type: [BookingDto],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BatchClassifyDto.prototype, "bookings", void 0);
//# sourceMappingURL=booking.dto.js.map