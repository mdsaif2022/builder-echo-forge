import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MapPin,
  FileText,
  DollarSign,
  TrendingUp,
  Eye,
  Calendar,
  Star,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTours } from "@/contexts/TourContext";
import { useBlogs } from "@/contexts/BlogContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function AdminDashboard() {
  const { tours } = useTours();
  const { blogPosts } = useBlogs();
  const { settings } = useSettings();

  // Mock user data - in a real app this would come from a user context
  const totalUsers = 2847;
  const totalBookings = tours.reduce((sum, tour) => sum + tour.bookings, 0);
  const totalRevenue = tours.reduce((sum, tour) => sum + (tour.price * tour.bookings), 0);
  const activeTours = tours.filter(tour => tour.status === "active").length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers.toLocaleString(),
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Tours",
      value: activeTours.toString(),
      change: `+${activeTours > 20 ? 3 : 1}`,
      trend: "up",
      icon: MapPin,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "Total Bookings",
      value: totalBookings.toLocaleString(),
      change: "+8%",
      trend: "up",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Revenue",
      value: `৳${totalRevenue.toLocaleString()}`,
      change: "+15%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

const recentBookings = [
  {
    id: 1,
    user: "Sarah Ahmed",
    tour: "Sundarbans Adventure",
    date: "2024-01-15",
    amount: "৳15,000",
    status: "confirmed",
  },
  {
    id: 2,
    user: "Rahul Khan",
    tour: "Cox's Bazar Getaway",
    date: "2024-01-14",
    amount: "৳8,000",
    status: "pending",
  },
  {
    id: 3,
    user: "Maya Begum",
    tour: "Srimangal Tea Tour",
    date: "2024-01-13",
    amount: "৳6,500",
    status: "confirmed",
  },
  {
    id: 4,
    user: "David Smith",
    tour: "Historical Dhaka",
    date: "2024-01-12",
    amount: "৳3,500",
    status: "confirmed",
  },
];

const pendingBlogs = [
  {
    id: 1,
    title: "My Journey Through the Sundarbans",
    author: "John Doe",
    date: "2024-01-15",
    status: "pending",
  },
  {
    id: 2,
    title: "Tea Gardens and Morning Mist",
    author: "Jane Smith",
    date: "2024-01-14",
    status: "pending",
  },
  {
    id: 3,
    title: "Cox's Bazar Sunset Experience",
    author: "Mike Johnson",
    date: "2024-01-13",
    status: "pending",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with Explore BD today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      from last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Quick Actions
              <Plus className="w-5 h-5 text-emerald-600" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/tours/new">
                <MapPin className="w-4 h-4 mr-2" />
                Add New Tour Package
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/users">
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/blogs">
                <FileText className="w-4 h-4 mr-2" />
                Review Pending Blogs
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Bookings
              <Link
                to="/admin/bookings"
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                View All
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{booking.user}</p>
                    <p className="text-sm text-gray-600">{booking.tour}</p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {booking.amount}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Blog Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Pending Blog Reviews
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                {pendingBlogs.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 line-clamp-1">
                      {blog.title}
                    </p>
                    <p className="text-sm text-gray-600">by {blog.author}</p>
                    <p className="text-xs text-gray-500">{blog.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild className="w-full" variant="outline">
                <Link to="/admin/blogs">View All Pending Reviews</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Page Views</span>
                <span className="font-semibold">24,853</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Sessions</span>
                <span className="font-semibold">142</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold ml-1">4.8</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold text-green-600">12.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}