import {
  IBooking,
  IClassificationResult,
} from "../interfaces/booking.interface";

export class Booking implements IBooking {
  constructor(
    public id: string,
    public customerName: string,
    public appointmentDate: Date,
    public description: string,
    public products: string[],
    public companyName?: string,
    public internalNotes?: string,
    public isHazardous?: boolean,
    public confidence?: number
  ) {}

  static fromDto(dto: any): Booking {
    return new Booking(
      dto.id,
      dto.customerName,
      new Date(dto.appointmentDate),
      dto.description,
      dto.products,
      dto.companyName,
      dto.internalNotes,
      dto.isHazardous,
      dto.confidence
    );
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

export class ClassificationResult implements IClassificationResult {
  constructor(
    public bookingId: string,
    public isHazardous: boolean,
    public confidence: number,
    public reasons: string[],
    public timestamp: Date = new Date()
  ) {}
}
