import {
  IsString,
  IsArray,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BookingDto {
  @ApiProperty({ description: "Unique booking identifier" })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: "Customer name" })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: "Company name", required: false })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ description: "Appointment date" })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({ description: "Description of items to be disposed" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: "List of products from dropdown selections" })
  @IsArray()
  @IsString({ each: true })
  products: string[];

  @ApiProperty({ description: "Internal notes", required: false })
  @IsOptional()
  @IsString()
  internalNotes?: string;
}

export class ClassifyBookingDto extends BookingDto {}

export class BatchClassifyDto {
  @ApiProperty({
    description: "Array of bookings to classify",
    type: [BookingDto],
  })
  @IsArray()
  bookings: BookingDto[];
}
