import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTours } from "@/contexts/TourContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Users,
  Star,
  DollarSign,
  Calendar,
  Image,
  Upload,
} from "lucide-react";

export default function TourManagement() {
  const { tours, deleteTour } = useTours();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || tour.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const NewTourModal = () => (
    <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Tour Package</DialogTitle>
          <DialogDescription>
            Create a new tour package for Bangladesh destinations
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Tour Name
              </label>
              <Input placeholder="Enter tour name" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Location
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dhaka">Dhaka Division</SelectItem>
                  <SelectItem value="chittagong">
                    Chittagong Division
                  </SelectItem>
                  <SelectItem value="sylhet">Sylhet Division</SelectItem>
                  <SelectItem value="khulna">Khulna Division</SelectItem>
                  <SelectItem value="rajshahi">Rajshahi Division</SelectItem>
                  <SelectItem value="barisal">Barisal Division</SelectItem>
                  <SelectItem value="rangpur">Rangpur Division</SelectItem>
                  <SelectItem value="mymensingh">
                    Mymensingh Division
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Duration
                </label>
                <Input placeholder="e.g., 3 Days" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Max Participants
                </label>
                <Input type="number" placeholder="20" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Price (৳)
              </label>
              <Input type="number" placeholder="15000" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Status
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Description
              </label>
              <Textarea placeholder="Enter tour description..." rows={4} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Tour Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload tour image</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Highlights
              </label>
              <Textarea
                placeholder="Enter tour highlights (one per line)..."
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                What's Included
              </label>
              <Textarea
                placeholder="Enter what's included (one per line)..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Create Tour Package
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tour Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage tour packages, pricing, and availability
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Tour
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tours.length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-100">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Tours
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {tours.filter((t) => t.status === "active").length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {tours.reduce((sum, tour) => sum + tour.bookings, 0)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(
                    tours.reduce((sum, tour) => sum + tour.rating, 0) /
                    tours.length
                  ).toFixed(1)}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tours by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tours Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tours ({filteredTours.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-2xl">
                          {tour.image}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {tour.name}
                          </p>
                          <p className="text-sm text-gray-500">ID: {tour.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {tour.location}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        <span className="text-sm">{tour.duration}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ৳{tour.price.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{tour.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(tour.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{tour.bookings}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedTour(tour)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Tour
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <DollarSign className="w-4 h-4 mr-2" />
                            Manage Pricing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              if (
                                confirm(
                                  `Are you sure you want to delete "${tour.name}"?`,
                                )
                              ) {
                                deleteTour(tour.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Tour
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Tour Details Modal */}
      {selectedTour && (
        <Dialog
          open={!!selectedTour}
          onOpenChange={() => setSelectedTour(null)}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTour.name}</DialogTitle>
              <DialogDescription>
                Detailed information about this tour package
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center text-6xl">
                  {selectedTour.image}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedTour.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTour.highlights.map(
                      (highlight: string, index: number) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <p className="text-sm mt-1">{selectedTour.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Duration
                    </label>
                    <p className="text-sm mt-1">{selectedTour.duration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Price
                    </label>
                    <p className="text-sm mt-1 font-semibold">
                      ৳{selectedTour.price.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Rating
                    </label>
                    <p className="text-sm mt-1">{selectedTour.rating} ⭐</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Max Participants
                    </label>
                    <p className="text-sm mt-1">
                      {selectedTour.maxParticipants}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Total Bookings
                    </label>
                    <p className="text-sm mt-1 font-semibold">
                      {selectedTour.bookings}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    What's Included
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedTour.includes.map(
                      (item: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Status:</span>
                    {getStatusBadge(selectedTour.status)}
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-600">Created:</span>
                    <span>{selectedTour.createdDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedTour(null)}>
                Close
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Edit Tour
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <NewTourModal />
    </div>
  );
}
