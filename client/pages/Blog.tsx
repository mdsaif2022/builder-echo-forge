import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Eye, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-emerald-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Travel Stories & Experiences
          </h1>
          <p className="text-xl text-emerald-100 mb-8">
            Read authentic travel stories from fellow explorers and share your
            own adventures
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold"
            asChild
          >
            <Link to="/blog/submit">Share Your Story</Link>
          </Button>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow bg-white"
              >
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-6xl">
                  {
                    ["🐅", "🌅", "🍃", "🏛️", "⛰️", "🚤", "🦎", "🌸", "🏖️"][
                      index
                    ]
                  }
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">
                    {
                      [
                        "Tiger Spotting in Sundarbans",
                        "Sunrise at Cox's Bazar",
                        "Tea Garden Adventures",
                        "Exploring Old Dhaka",
                        "Hill Tracts Journey",
                        "River Life Experience",
                        "Wildlife Photography",
                        "Spring in Rangamati",
                        "Beach Life Chronicles",
                      ][index]
                    }
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    Join me on this incredible journey through Bangladesh's most
                    beautiful destinations and discover hidden gems that will
                    take your breath away...
                  </p>

                  <div className="flex items-center justify-between text-sm text-emerald-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>
                        {
                          [
                            "Sarah Ahmed",
                            "Rahul Khan",
                            "Maya Begum",
                            "David Smith",
                            "Fatima Ali",
                            "John Doe",
                            "Rashida Akter",
                            "Mike Johnson",
                            "Ayesha Rahman",
                          ][index]
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{index + 1} days ago</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{Math.floor(Math.random() * 20) + 5}</span>
                      </div>
                    </div>
                    <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
                      Read More
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white px-8 py-4 font-semibold"
            >
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* User Content Submission Info */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-emerald-900 mb-6">
            Share Your Travel Experience
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Have an amazing Bangladesh travel story? Share it with our community
            and inspire others to explore!
          </p>
          <div className="bg-emerald-50 rounded-2xl p-8 text-left">
            <h3 className="text-xl font-semibold text-emerald-900 mb-4">
              Submission Guidelines:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Include a compelling title and detailed description</li>
              <li>• Add high-quality images or videos from your trip</li>
              <li>• Verified users only (registration required)</li>
              <li>• All submissions reviewed by admin before publishing</li>
              <li>• Share authentic experiences and helpful tips</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
