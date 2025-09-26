import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HazardousClassifierService } from "../services/hazardous-classifier.service";
import { DataProcessorService } from "../services/data-processor.service";
import {
  BookingDto,
  ClassifyBookingDto,
  BatchClassifyDto,
} from "../dto/booking.dto";
import { Booking } from "../models/booking.model";

@ApiTags("Classification")
@Controller("api/classify")
export class ClassificationController {
  constructor(
    private readonly hazardousClassifier: HazardousClassifierService,
    private readonly dataProcessor: DataProcessorService
  ) {}

  @Post("single")
  @ApiOperation({
    summary: "Classify a single booking for hazardous materials",
  })
  @ApiResponse({
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
  })
  async classifySingle(@Body() bookingDto: ClassifyBookingDto) {
    try {
      const booking = Booking.fromDto(bookingDto);
      const result = await this.hazardousClassifier.classify(booking);

      return {
        bookingId: booking.id,
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        `Classification failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("batch")
  @ApiOperation({
    summary: "Classify multiple bookings for hazardous materials",
  })
  @ApiResponse({
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
  })
  async classifyBatch(@Body() batchDto: BatchClassifyDto) {
    try {
      const bookings = batchDto.bookings.map((dto) => Booking.fromDto(dto));
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
          avgConfidence: parseFloat(
            (totalConfidence / bookings.length).toFixed(3)
          ),
        },
      };
    } catch (error) {
      throw new HttpException(
        `Batch classification failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
