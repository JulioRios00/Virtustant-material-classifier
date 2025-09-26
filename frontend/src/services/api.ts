import axios from "axios";
import {
  Booking,
  ClassificationResult,
  BatchClassificationResult,
  BackfillResult,
} from "../types/booking";

const API_BASE_URL = "http://localhost:3001/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const classificationService = {
  async classifySingle(booking: Booking): Promise<ClassificationResult> {
    const response = await apiClient.post("/classify/single", booking);
    return response.data;
  },

  async classifyBatch(bookings: Booking[]): Promise<BatchClassificationResult> {
    const response = await apiClient.post("/classify/batch", { bookings });
    return response.data;
  },
};

export const dataService = {
  async backfillData(bookings: Booking[]): Promise<BackfillResult> {
    const response = await apiClient.post("/data/backfill", { bookings });
    return response.data;
  },

  async getStatus(): Promise<{
    status: string;
    maxConcurrentRequests: number;
    rateLimit: string;
  }> {
    const response = await apiClient.get("/data/status");
    return response.data;
  },
};
