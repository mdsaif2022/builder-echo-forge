import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-emerald-900/20 via-emerald-800/30 to-orange-900/20" />
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><pattern id="sundarbans" patternUnits="userSpaceOnUse" width="40" height="40"><rect fill="%23065f46" width="40" height="40"/><path fill="%23047857" d="M20 10c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10z"/></pattern></defs><rect fill="url(%23sundarbans)" width="1200" height="800"/><g opacity="0.1"><path fill="%23f97316" d="M0 400c200-100 400-50 600 0s400 50 600-50v450H0V400z"/></g></svg>')`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Discover the
          <span className="block bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
            Beauty of Bangladesh
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-emerald-50 mb-8 max-w-3xl mx-auto leading-relaxed">
          From the mystical Sundarbans to the pristine beaches of Cox's Bazar,
          experience the rich culture, heritage, and natural wonders of
          Bangladesh
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold"
            asChild
          >
            <Link to="/tours">
              <Calendar className="w-5 h-5 mr-2" />
              Book Your Adventure
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 text-lg font-semibold"
            asChild
          >
            <Link to="/tours">
              <MapPin className="w-5 h-5 mr-2" />
              Explore Destinations
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-orange-300 mb-2">50+</div>
            <div className="text-emerald-50 font-medium">Destinations</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-orange-300 mb-2">10K+</div>
            <div className="text-emerald-50 font-medium">Happy Travelers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-orange-300 mb-2">5★</div>
            <div className="text-emerald-50 font-medium">Customer Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
