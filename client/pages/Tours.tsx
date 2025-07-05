import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Users, Star } from "lucide-react";

export default function Tours() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Discover Bangladesh Tours
          </h1>
          <p className="text-xl text-emerald-100 mb-8">
            Choose from our curated selection of authentic Bangladesh
            experiences
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample tour cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-6xl">
                  {["🌿", "🏖️", "🍃", "🏛️", "⛰️", "🚤"][index]}
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-emerald-900">
                      {
                        [
                          "Sundarbans Adventure",
                          "Cox's Bazar Getaway",
                          "Srimangal Tea Tour",
                          "Historical Dhaka",
                          "Bandarban Hills",
                          "River Cruise",
                        ][index]
                      }
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="text-sm font-semibold">4.8</span>
                    </div>
                  </div>

                  <div className="flex items-center text-emerald-600 mb-3 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">3 Days</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm">Max 12</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm">
                    Experience the authentic beauty and culture of Bangladesh
                    with our expert guides.
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-emerald-700">
                      ৳{(8000 + index * 2000).toLocaleString()}
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-600 to-emerald-700"
                      asChild
                    >
                      <Link to={`/booking?tour=${index + 1}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Features Info */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
              Easy Booking Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-900 mb-2">
                  Select Route
                </h3>
                <p className="text-gray-600 text-sm">
                  Choose your departure and destination from our predefined
                  locations
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-emerald-900 mb-2">
                  Choose Seats
                </h3>
                <p className="text-gray-600 text-sm">
                  Select your preferred seats from our visual 40-seat layout
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-emerald-600 rounded text-white text-xs flex items-center justify-center font-bold">
                    ৳
                  </div>
                </div>
                <h3 className="font-semibold text-emerald-900 mb-2">
                  Pay with bKash
                </h3>
                <p className="text-gray-600 text-sm">
                  Secure payment via bKash with instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
