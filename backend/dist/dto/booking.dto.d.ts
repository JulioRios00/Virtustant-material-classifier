export declare class BookingDto {
    id: string;
    customerName: string;
    companyName?: string;
    appointmentDate: string;
    description: string;
    products: string[];
    internalNotes?: string;
}
export declare class ClassifyBookingDto extends BookingDto {
}
export declare class BatchClassifyDto {
    bookings: BookingDto[];
}
