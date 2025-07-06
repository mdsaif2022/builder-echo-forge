import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Tour {
  id: number;
  name: string;
  location: string;
  destination: string;
  duration: string;
  maxParticipants: number;
  price: number;
  rating: number;
  status: "active" | "draft" | "inactive";
  bookings: number;
  image: string;
  description: string;
  highlights: string[];
  includes: string[];
  createdDate: string;
}

interface TourContextType {
  tours: Tour[];
  addTour: (
    tour: Omit<Tour, "id" | "rating" | "bookings" | "createdDate">,
  ) => void;
  updateTour: (id: number, tour: Partial<Tour>) => void;
  deleteTour: (id: number) => void;
  getTourById: (id: number) => Tour | undefined;
  getActiveTours: () => Tour[];
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const initialTours: Tour[] = [
  {
    id: 1,
    name: "Sundarbans Adventure",
    location: "Khulna Division",
    destination: "Khulna",
    duration: "3 Days",
    maxParticipants: 12,
    price: 15000,
    rating: 4.9,
    status: "active",
    bookings: 142,
    image: "🌿",
    description:
      "Explore the world's largest mangrove forest and spot Bengal tigers in their natural habitat.",
    highlights: ["Royal Bengal Tiger", "Boat Safari", "Mangrove Ecosystem"],
    includes: ["Accommodation", "Meals", "Guide", "Transportation"],
    createdDate: "2024-01-01",
  },
  {
    id: 2,
    name: "Cox's Bazar Beach",
    location: "Chittagong Division",
    destination: "Cox's Bazar",
    duration: "2 Days",
    maxParticipants: 20,
    price: 8000,
    rating: 4.8,
    status: "active",
    bookings: 98,
    image: "🏖️",
    description:
      "Experience the world's longest natural sea beach with golden sand and stunning sunsets.",
    highlights: ["Longest Sea Beach", "Sunset Views", "Water Sports"],
    includes: ["Hotel Stay", "Breakfast", "Transportation"],
    createdDate: "2024-01-02",
  },
  {
    id: 3,
    name: "Srimangal Tea Gardens",
    location: "Sylhet Division",
    destination: "Sylhet",
    duration: "2 Days",
    maxParticipants: 15,
    price: 6500,
    rating: 4.7,
    status: "active",
    bookings: 76,
    image: "🍃",
    description:
      "Walk through rolling hills covered in lush tea gardens and learn about tea culture.",
    highlights: ["Tea Plantations", "Lawachara Forest", "Tribal Culture"],
    includes: ["Accommodation", "Tea Tasting", "Forest Guide"],
    createdDate: "2024-01-03",
  },
  {
    id: 4,
    name: "Historical Dhaka",
    location: "Dhaka Division",
    destination: "Dhaka",
    duration: "1 Day",
    maxParticipants: 25,
    price: 3500,
    rating: 4.6,
    status: "draft",
    bookings: 0,
    image: "🏛️",
    description:
      "Discover ancient architecture, vibrant markets, and rich Mughal heritage.",
    highlights: ["Lalbagh Fort", "Old Dhaka", "Mughal Architecture"],
    includes: ["Guide", "Lunch", "Entry Tickets"],
    createdDate: "2024-01-15",
  },
  {
    id: 5,
    name: "Bandarban Hills",
    location: "Chittagong Division",
    destination: "Bandarban",
    duration: "3 Days",
    maxParticipants: 10,
    price: 12000,
    rating: 4.5,
    status: "active",
    bookings: 45,
    image: "⛰️",
    description:
      "Adventure through the hills and valleys of Bandarban with tribal culture experience.",
    highlights: ["Hill Trekking", "Tribal Villages", "Natural Springs"],
    includes: ["Camping", "Local Guide", "Meals"],
    createdDate: "2024-01-10",
  },
  {
    id: 6,
    name: "River Cruise",
    location: "Dhaka Division",
    destination: "Dhaka",
    duration: "1 Day",
    maxParticipants: 30,
    price: 5000,
    rating: 4.4,
    status: "active",
    bookings: 67,
    image: "🚤",
    description:
      "Enjoy a relaxing river cruise through the heart of Bangladesh.",
    highlights: ["River Views", "Local Life", "Traditional Boats"],
    includes: ["Boat Ride", "Lunch", "Guide"],
    createdDate: "2024-01-12",
  },
];

export function TourProvider({ children }: { children: ReactNode }) {
  const [tours, setTours] = useState<Tour[]>(initialTours);

  const addTour = (
    newTour: Omit<Tour, "id" | "rating" | "bookings" | "createdDate">,
  ) => {
    const tour: Tour = {
      ...newTour,
      id: Math.max(...tours.map((t) => t.id), 0) + 1,
      rating: 0,
      bookings: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setTours((prev) => [...prev, tour]);
    return tour;
  };

  const updateTour = (id: number, updatedTour: Partial<Tour>) => {
    setTours((prev) =>
      prev.map((tour) => (tour.id === id ? { ...tour, ...updatedTour } : tour)),
    );
  };

  const deleteTour = (id: number) => {
    setTours((prev) => prev.filter((tour) => tour.id !== id));
  };

  const getTourById = (id: number) => {
    return tours.find((tour) => tour.id === id);
  };

  const getActiveTours = () => {
    return tours.filter((tour) => tour.status === "active");
  };

  const value: TourContextType = {
    tours,
    addTour,
    updateTour,
    deleteTour,
    getTourById,
    getActiveTours,
  };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTours() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error("useTours must be used within a TourProvider");
  }
  return context;
}
