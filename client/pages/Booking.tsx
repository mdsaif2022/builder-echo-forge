import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  CreditCard,
  Check,
  Upload,
} from "lucide-react";

// Sample tour data - in real app this would come from API
const tours = [
  {
    id: 1,
    name: "Sundarbans Adventure",
    location: "Khulna Division",
    duration: "3 Days",
    price: 15000,
    image: "🌿",
  },
  {
    id: 2,
    name: "Cox's Bazar Beach",
    location: "Chittagong Division",
    duration: "2 Days",
    price: 8000,
    image: "🏖️",
  },
  {
    id: 3,
    name: "Srimangal Tea Gardens",
    location: "Sylhet Division",
    duration: "2 Days",
    price: 6500,
    image: "🍃",
  },
  {
    id: 4,
    name: "Historical Dhaka",
    location: "Dhaka Division",
    duration: "1 Day",
    price: 3500,
    image: "🏛️",
  },
];

const locations = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "Comilla",
  "Gazipur",
];

// Generate 40-seat layout (A1-I4 + J,K,L,M at back)
const generateSeats = () => {
  const seats = [];
  // Rows A-I with 4 seats each (A1-A4, B1-B4, etc.)
  for (let row of ["A", "B", "C", "D", "E", "F", "G", "H", "I"]) {
    for (let num = 1; num <= 4; num++) {
      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        isAvailable: Math.random() > 0.3, // Random availability for demo
      });
    }
  }

  // Back row seats J, K, L, M
  for (let seat of ["J", "K", "L", "M"]) {
    seats.push({
      id: seat,
      row: seat,
      number: 1,
      isAvailable: Math.random() > 0.3,
    });
  }

  return seats;
};

export default function Booking() {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tour");
  const selectedTour =
    tours.find((t) => t.id === parseInt(tourId || "1")) || tours[0];

  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    from: "",
    to: "",
    persons: 1,
    date: "",
    selectedSeats: [] as string[],
    customerInfo: {
      name: "",
      email: "",
      phone: "",
    },
    paymentProof: null as File | null,
  });

  const [seats] = useState(generateSeats());

  const handleSeatSelect = (seatId: string) => {
    setBookingData((prev) => ({
      ...prev,
      selectedSeats: prev.selectedSeats.includes(seatId)
        ? prev.selectedSeats.filter((id) => id !== seatId)
        : prev.selectedSeats.length < prev.persons
          ? [...prev.selectedSeats, seatId]
          : prev.selectedSeats,
    }));
  };

  const totalAmount = selectedTour.price * bookingData.persons;
  const bkashNumber = "+880 1700-000000";

  const renderSeatMap = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-emerald-900 mb-6 text-center">
        Select Your Seats ({bookingData.selectedSeats.length}/
        {bookingData.persons})
      </h3>

      {/* Driver area */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-8 bg-gray-300 rounded-t-lg flex items-center justify-center text-xs font-medium">
          Driver
        </div>
      </div>

      {/* Main seating area (A-I rows) */}
      <div className="grid grid-cols-4 gap-2 mb-6 max-w-xs mx-auto">
        {seats.slice(0, 36).map((seat) => (
          <button
            key={seat.id}
            onClick={() => seat.isAvailable && handleSeatSelect(seat.id)}
            disabled={!seat.isAvailable}
            className={`
              w-12 h-12 rounded-lg border-2 text-xs font-medium transition-all
              ${
                !seat.isAvailable
                  ? "bg-red-100 border-red-300 text-red-400 cursor-not-allowed"
                  : bookingData.selectedSeats.includes(seat.id)
                    ? "bg-emerald-500 border-emerald-600 text-white"
                    : "bg-gray-100 border-gray-300 hover:bg-emerald-100 hover:border-emerald-300"
              }
            `}
          >
            {seat.id}
          </button>
        ))}
      </div>

      {/* Back row seats */}
      <div className="flex justify-center gap-2 mb-6">
        {seats.slice(36).map((seat) => (
          <button
            key={seat.id}
            onClick={() => seat.isAvailable && handleSeatSelect(seat.id)}
            disabled={!seat.isAvailable}
            className={`
              w-12 h-12 rounded-lg border-2 text-xs font-medium transition-all
              ${
                !seat.isAvailable
                  ? "bg-red-100 border-red-300 text-red-400 cursor-not-allowed"
                  : bookingData.selectedSeats.includes(seat.id)
                    ? "bg-emerald-500 border-emerald-600 text-white"
                    : "bg-gray-100 border-gray-300 hover:bg-emerald-100 hover:border-emerald-300"
              }
            `}
          >
            {seat.id}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-500 border-2 border-emerald-600 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/tours">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tours
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">
                  Book Your Tour
                </h1>
                <p className="text-emerald-600">{selectedTour.name}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">{selectedTour.image}</div>
              <div className="text-sm text-gray-600">
                {selectedTour.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step >= stepNumber
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }
              `}
              >
                {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div
                  className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-emerald-600" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Trip Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from">From</Label>
                      <Select
                        value={bookingData.from}
                        onValueChange={(value) =>
                          setBookingData((prev) => ({ ...prev, from: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select departure city" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="to">To</Label>
                      <Select
                        value={bookingData.to}
                        onValueChange={(value) =>
                          setBookingData((prev) => ({ ...prev, to: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="persons">Number of Persons</Label>
                      <Select
                        value={bookingData.persons.toString()}
                        onValueChange={(value) =>
                          setBookingData((prev) => ({
                            ...prev,
                            persons: parseInt(value),
                            selectedSeats: [],
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Person" : "Persons"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="date">Travel Date</Label>
                      <Input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) =>
                          setBookingData((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={
                      !bookingData.from || !bookingData.to || !bookingData.date
                    }
                  >
                    Continue to Seat Selection
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <div>
                {renderSeatMap()}
                <div className="mt-6 flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    disabled={
                      bookingData.selectedSeats.length !== bookingData.persons
                    }
                  >
                    Continue to Customer Info
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      value={bookingData.customerInfo.name}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          customerInfo: {
                            ...prev.customerInfo,
                            name: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      value={bookingData.customerInfo.email}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          customerInfo: {
                            ...prev.customerInfo,
                            email: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      value={bookingData.customerInfo.phone}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          customerInfo: {
                            ...prev.customerInfo,
                            phone: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(4)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      disabled={
                        !bookingData.customerInfo.name ||
                        !bookingData.customerInfo.email ||
                        !bookingData.customerInfo.phone
                      }
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment via bKash
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-900 mb-4">
                      Payment Instructions:
                    </h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-pink-800">
                      <li>
                        Send <strong>৳{totalAmount.toLocaleString()}</strong> to
                        our bKash number
                      </li>
                      <li>
                        bKash Number:{" "}
                        <strong className="font-mono">{bkashNumber}</strong>
                      </li>
                      <li>Use "Send Money" option in your bKash app</li>
                      <li>Save the transaction ID after payment</li>
                      <li>
                        Upload payment screenshot or enter transaction ID below
                      </li>
                    </ol>
                  </div>

                  <div>
                    <Label htmlFor="transaction">Transaction ID</Label>
                    <Input placeholder="Enter bKash transaction ID" />
                  </div>

                  <div>
                    <Label htmlFor="payment-proof">
                      Payment Screenshot (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Upload payment screenshot
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep(3)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                      Confirm Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedTour.image}</div>
                  <div>
                    <h3 className="font-semibold">{selectedTour.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedTour.location}
                    </p>
                  </div>
                </div>

                <Separator />

                {bookingData.from && bookingData.to && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Route:</span>
                      <span>
                        {bookingData.from} → {bookingData.to}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Date:</span>
                      <span>{bookingData.date}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Persons:</span>
                      <span>{bookingData.persons}</span>
                    </div>
                  </div>
                )}

                {bookingData.selectedSeats.length > 0 && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Selected Seats:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {bookingData.selectedSeats.map((seat) => (
                        <Badge key={seat} variant="outline">
                          {seat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Price per person:</span>
                    <span>৳{selectedTour.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Persons:</span>
                    <span>× {bookingData.persons}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>৳{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
