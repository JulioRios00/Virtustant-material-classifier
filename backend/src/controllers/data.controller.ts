import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DataProcessorService } from "../services/data-processor.service";
import { BookingDto } from "../dto/booking.dto";
import { Booking } from "../models/booking.model";

@ApiTags("Data Processing")
@Controller("api/data")
export class DataController {
  constructor(private readonly dataProcessor: DataProcessorService) {}

  @Post("backfill")
  @ApiOperation({
    summary:
      "Backfill existing bookings with hazardous material classification",
  })
  @ApiResponse({
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
  })
  async backfillData(@Body() body: { bookings: BookingDto[] }) {
    try {
      const startTime = Date.now();
      const bookings = body.bookings.map((dto) => Booking.fromDto(dto));

      const results = await this.dataProcessor.processLargeDataset(bookings);

      const processingTime = ((Date.now() - startTime) / 1000).toFixed(2);

      return {
        ...results,
        processingTime: `${processingTime} seconds`,
      };
    } catch (error) {
      throw new HttpException(
        `Backfill processing failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get("status")
  @ApiOperation({ summary: "Get data processing status" })
  @ApiResponse({
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
  })
  getStatus() {
    return {
      status: "operational",
      maxConcurrentRequests: 100,
      rateLimit: "100 requests per second",
    };
  }
}
