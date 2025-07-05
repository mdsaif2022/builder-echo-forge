import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Sundarbans Mangrove Forest",
    location: "Khulna Division",
    image: "🌿",
    description:
      "World's largest mangrove forest and home to the Royal Bengal Tiger",
    duration: "3 Days",
    rating: 4.9,
    price: "৳15,000",
    highlights: ["Royal Bengal Tiger", "Boat Safari", "Mangrove Ecosystem"],
  },
  {
    id: 2,
    name: "Cox's Bazar Beach",
    location: "Chittagong Division",
    image: "🏖️",
    description:
      "World's longest natural sea beach with golden sand and stunning sunsets",
    duration: "2 Days",
    rating: 4.8,
    price: "৳8,000",
    highlights: ["Longest Sea Beach", "Sunset Views", "Water Sports"],
  },
  {
    id: 3,
    name: "Srimangal Tea Gardens",
    location: "Sylhet Division",
    image: "🍃",
    description:
      "Rolling hills covered in lush tea gardens and pristine natural beauty",
    duration: "2 Days",
    rating: 4.7,
    price: "৳6,500",
    highlights: ["Tea Plantations", "Lawachara Forest", "Tribal Culture"],
  },
  {
    id: 4,
    name: "Historical Dhaka",
    location: "Dhaka Division",
    image: "🏛️",
    description:
      "Ancient architecture, vibrant markets, and rich Mughal heritage",
    duration: "1 Day",
    rating: 4.6,
    price: "৳3,500",
    highlights: ["Lalbagh Fort", "Old Dhaka", "Mughal Architecture"],
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-emerald-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto">
            Discover Bangladesh's most breathtaking locations, from pristine
            beaches to ancient forests and historical landmarks
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              <div className="relative overflow-hidden">
                {/* Image placeholder with emoji */}
                <div className="h-64 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                  {destination.image}
                </div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {destination.price}
                </div>

                {/* Rating */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="font-semibold text-sm">
                    {destination.rating}
                  </span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-700 transition-colors">
                    {destination.name}
                  </h3>
                </div>

                <div className="flex items-center text-emerald-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">
                    {destination.location}
                  </span>
                  <Clock className="w-4 h-4 ml-4 mr-1" />
                  <span className="text-sm font-medium">
                    {destination.duration}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 font-semibold"
                  asChild
                >
                  <Link to="/tours">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-4 font-semibold"
            asChild
          >
            <Link to="/tours">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
