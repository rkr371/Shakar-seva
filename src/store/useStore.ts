import { create } from 'zustand';
import { Worker, Booking, ServiceRequest, DemoState } from '../types';

interface AppState {
  workers: Worker[];
  bookings: Booking[];
  serviceRequests: ServiceRequest[];
  demoState: DemoState;
  activeCustomerRequest: ServiceRequest | null;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  setDemoStep: (step: number) => void;
  toggleDemoMode: () => void;
  setActiveCustomerRequest: (req: ServiceRequest | null) => void;
  updateWorkerStatus: (id: string, status: Worker['status']) => void;
}

const initialWorkers: Worker[] = [
  {
    id: "w1",
    name: "Ramesh Patel",
    skill: "Plumbing",
    rating: 4.8,
    distance: 1.8,
    status: "Available",
    experience: 6,
    cooperative: "Bardoli Labour Cooperative Society",
    completedJobs: 342,
    coordinates: [21.1702, 72.8311], // Surat area
    verified: true,
  },
  {
    id: "w2",
    name: "Priya Desai",
    skill: "Cleaning",
    rating: 4.9,
    distance: 2.1,
    status: "Busy",
    experience: 4,
    cooperative: "Surat Women's Cooperative",
    completedJobs: 215,
    coordinates: [21.1852, 72.8211],
    verified: true,
  },
  {
    id: "w3",
    name: "Mahesh Solanki",
    skill: "Plumbing",
    rating: 4.5,
    distance: 3.5,
    status: "Available",
    experience: 8,
    cooperative: "Navsari Labour Cooperative",
    completedJobs: 410,
    coordinates: [21.1602, 72.8411],
    verified: true,
  },
  {
    id: "w4",
    name: "Sanjay Kumar",
    skill: "Electrical",
    rating: 4.7,
    distance: 1.2,
    status: "Available",
    experience: 5,
    cooperative: "Bardoli Labour Cooperative Society",
    completedJobs: 189,
    coordinates: [21.1902, 72.8111],
    verified: true,
  }
];

export const useStore = create<AppState>((set) => ({
  workers: initialWorkers,
  bookings: [],
  serviceRequests: [],
  demoState: {
    currentStep: 0,
    isActive: false,
  },
  activeCustomerRequest: null,
  addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
  updateBookingStatus: (id, status) => set((state) => ({
    bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
  })),
  setDemoStep: (step) => set((state) => ({ demoState: { ...state.demoState, currentStep: step } })),
  toggleDemoMode: () => set((state) => ({ demoState: { ...state.demoState, isActive: !state.demoState.isActive } })),
  setActiveCustomerRequest: (req) => set({ activeCustomerRequest: req }),
  updateWorkerStatus: (id, status) => set((state) => ({
    workers: state.workers.map(w => w.id === id ? { ...w, status } : w)
  })),
}));
