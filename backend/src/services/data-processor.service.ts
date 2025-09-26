import { Injectable } from "@nestjs/common";
import { IDataProcessor } from "../interfaces/classifier.interface";
import { IBooking } from "../interfaces/booking.interface";
import { HazardousClassifierService } from "./hazardous-classifier.service";

@Injectable()
export class DataProcessorService implements IDataProcessor {
  private readonly MAX_CONCURRENT_REQUESTS = 100;

  constructor(
    private readonly hazardousClassifier: HazardousClassifierService
  ) {}

  async processBatch(bookings: IBooking[]): Promise<IBooking[]> {
    const processedBookings: IBooking[] = [];

    for (let i = 0; i < bookings.length; i += this.MAX_CONCURRENT_REQUESTS) {
      const batch = bookings.slice(i, i + this.MAX_CONCURRENT_REQUESTS);

      const batchPromises = batch.map(async (booking) => {
        try {
          const classification =
            await this.hazardousClassifier.classify(booking);

          return {
            ...booking,
            isHazardous: classification.isHazardous,
            confidence: classification.confidence,
          };
        } catch (error) {
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

  async updateBooking(id: string, data: Partial<IBooking>): Promise<boolean> {
    const updateData = (id: string, data: Partial<IBooking>) => {
      return true;
    };

    return updateData(id, data);
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async processLargeDataset(bookings: IBooking[]): Promise<{
    processed: number;
    errors: number;
    hazardous: number;
    nonHazardous: number;
  }> {
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
        } else {
          nonHazardous++;
        }

        await this.updateBooking(result.id, {
          isHazardous: result.isHazardous,
          confidence: result.confidence,
        });
      } else {
        errors++;
      }
    }

    return { processed, errors, hazardous, nonHazardous };
  }
}
