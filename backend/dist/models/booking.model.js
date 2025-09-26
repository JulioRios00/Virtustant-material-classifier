"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassificationResult = exports.Booking = void 0;
class Booking {
    constructor(id, customerName, appointmentDate, description, products, companyName, internalNotes, isHazardous, confidence) {
        this.id = id;
        this.customerName = customerName;
        this.appointmentDate = appointmentDate;
        this.description = description;
        this.products = products;
        this.companyName = companyName;
        this.internalNotes = internalNotes;
        this.isHazardous = isHazardous;
        this.confidence = confidence;
    }
    static fromDto(dto) {
        return new Booking(dto.id, dto.customerName, new Date(dto.appointmentDate), dto.description, dto.products, dto.companyName, dto.internalNotes, dto.isHazardous, dto.confidence);
    }
    toJson() {
        return {
            id: this.id,
            customerName: this.customerName,
            companyName: this.companyName,
            appointmentDate: this.appointmentDate,
            description: this.description,
            products: this.products,
            internalNotes: this.internalNotes,
            isHazardous: this.isHazardous,
            confidence: this.confidence,
        };
    }
}
exports.Booking = Booking;
class ClassificationResult {
    constructor(bookingId, isHazardous, confidence, reasons, timestamp = new Date()) {
        this.bookingId = bookingId;
        this.isHazardous = isHazardous;
        this.confidence = confidence;
        this.reasons = reasons;
        this.timestamp = timestamp;
    }
}
exports.ClassificationResult = ClassificationResult;
//# sourceMappingURL=booking.model.js.map