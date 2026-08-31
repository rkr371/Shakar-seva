export type WorkerStatus = "Available" | "Busy" | "Inactive" | "Pending";

export interface Worker {
  id: string;
  name: string;
  skill: string;
  rating: number;
  distance: number;
  status: WorkerStatus;
  experience: number;
  matchScore?: number;
  cooperative: string;
  completedJobs: number;
  coordinates: [number, number]; // lat, lng
  verified: boolean;
}

export interface Booking {
  id: string;
  service: string;
  workerId: string;
  customerId: string;
  date: string;
  time: string;
  status: "Pending" | "Job Accepted ✓" | "On the way" | "Service in progress" | "Completed" | "Cancelled";
  estimatedAmount: number;
  location: string;
  coordinates: [number, number];
}

export interface Cooperative {
  id: string;
  name: string;
  location: string;
  totalWorkers: number;
  availableWorkers: number;
}

export interface ServiceRequest {
  id: string;
  description: string;
  category: string;
  priority: "Normal" | "High" | "Emergency";
  estimatedDuration: string;
  status: "Open" | "Matched" | "Booked";
  coordinates: [number, number];
}

export interface DemoState {
  currentStep: number;
  isActive: boolean;
}
