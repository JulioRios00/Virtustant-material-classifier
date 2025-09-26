import { useState } from "react";
import { classificationService, dataService } from "../services/api";
import {
  Booking,
  ClassificationResult,
  BatchClassificationResult,
  BackfillResult,
} from "../types/booking";

export const useClassification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classifySingle = async (
    booking: Booking
  ): Promise<ClassificationResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await classificationService.classifySingle(booking);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Classification failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const classifyBatch = async (
    bookings: Booking[]
  ): Promise<BatchClassificationResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await classificationService.classifyBatch(bookings);
      return result;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Batch classification failed"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const backfillData = async (
    bookings: Booking[]
  ): Promise<BackfillResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const result = await dataService.backfillData(bookings);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Backfill failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    classifySingle,
    classifyBatch,
    backfillData,
  };
};
