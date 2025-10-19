"use client";

import React, { useState, useEffect } from "react";
import Header from "../header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Star,
  Users,
  Award,
  MapPin,
  Heart,
  Grid3X3,
  List,
} from "lucide-react";
import Link from "next/link";

const mockArtisans = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@example.com",
    image: "/placeholder-avatar.jpg",
    productCount: 24,
    totalSales: 125000,
    avgRating: 4.8,
    joinedAt: new Date("2023-01-15"),
    location: "Kathmandu, Nepal",
    specialty: "Traditional Pottery",
    bio: "Master potter with 15 years of experience in traditional Nepali ceramics.",
    verified: true,
  },
  {
    id: "2",
    name: "Raj Thapa",
    email: "raj@example.com",
    image: "/placeholder-avatar.jpg",
    productCount: 18,
    totalSales: 89000,
    avgRating: 4.6,
    joinedAt: new Date("2023-03-22"),
    location: "Pokhara, Nepal",
    specialty: "Wood Carving",
    bio: "Expert wood carver specializing in intricate religious and decorative pieces.",
    verified: true,
  },
  {
    id: "3",
    name: "Sunita Gurung",
    email: "sunita@example.com",
    image: "/placeholder-avatar.jpg",
    productCount: 31,
    totalSales: 156000,
    avgRating: 4.9,
    joinedAt: new Date("2022-11-08"),
    location: "Bhaktapur, Nepal",
    specialty: "Textile Weaving",
    bio: "Traditional weaver creating beautiful handwoven textiles and clothing.",
    verified: true,
  },
  {
    id: "4",
    name: "Kumar Maharjan",
    email: "kumar@example.com",
    image: "/placeholder-avatar.jpg",
    productCount: 12,
    totalSales: 67000,
    avgRating: 4.4,
    joinedAt: new Date("2023-06-10"),
    location: "Lalitpur, Nepal",
    specialty: "Metal Work",
    bio: "Skilled metalworker crafting traditional jewelry and decorative items.",
    verified: false,
  },
  {
    id: "5",
    name: "Anita Tamang",
    email: "anita@example.com",
    image: "/placeholder-avatar.jpg",
    productCount: 27,
    totalSales: 134000,
    avgRating: 4.7,
    joinedAt: new Date("2023-02-14"),
    location: "Dharan, Nepal",
    specialty: "Bamboo Crafts",
    bio: "Expert in bamboo weaving creating functional and decorative items.",
    verified: true,
  },
  {
    id: "6",
    name: "Bikash Shrestha",
    email: "bikash@example.com",
    image: "/placeholder-avatar.jpg",
    productCount: 15,
    totalSales: 78000,
    avgRating: 4.5,
    joinedAt: new Date("2023-04-30"),
    location: "Chitwan, Nepal",
    specialty: "Stone Carving",
    bio: "Traditional stone carver creating beautiful sculptures and architectural elements.",
    verified: false,
  },
];

const ArtisansPage = () => {
  const [filteredArtisans, setFilteredArtisans] = useState(mockArtisans);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null
  );

  const specialties = [
    "All Specialties",
    "Traditional Pottery",
    "Wood Carving",
    "Textile Weaving",
    "Metal Work",
    "Bamboo Crafts",
    "Stone Carving",
  ];

  useEffect(() => {
    let filtered = mockArtisans.filter((artisan) => {
      const matchesSearch =
        searchQuery === "" ||
        artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        !selectedSpecialty ||
        selectedSpecialty === "All Specialties" ||
        artisan.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });

    // Apply sorting
    switch (sortBy) {
      case "popular":
        filtered = filtered.sort((a, b) => b.productCount - a.productCount);
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.avgRating - a.avgRating);
        break;
      case "sales":
        filtered = filtered.sort((a, b) => b.totalSales - a.totalSales);
        break;
      case "newest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
        );
        break;
      case "name":
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredArtisans(filtered);
  }, [searchQuery, sortBy, selectedSpecialty]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Meet Our Artisans
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the talented craftspeople behind our handmade products.
              Each artisan brings generations of traditional knowledge and
              passion to create unique, authentic pieces.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {mockArtisans.length}
                </div>
                <div className="text-sm text-gray-600">Active Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {mockArtisans.reduce(
                    (sum, artisan) => sum + artisan.productCount,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {mockArtisans.filter((a) => a.verified).length}
                </div>
                <div className="text-sm text-gray-600">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600">
                  {(
                    mockArtisans.reduce(
                      (sum, artisan) => sum + artisan.avgRating,
                      0
                    ) / mockArtisans.length
                  ).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-auto lg:flex-1 lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search artisans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-full"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Specialty Filter */}
                <Select
                  value={selectedSpecialty || "All Specialties"}
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger className="w-full sm:w-48 rounded-full">
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 rounded-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="sales">Top Sellers</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-full"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-full"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Artisans Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredArtisans.map((artisan) => (
              <Card
                key={artisan.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 hover:-translate-y-2"
              >
                <CardContent className="p-6">
                  {viewMode === "grid" ? (
                    // Grid View
                    <div className="text-center space-y-4">
                      <div className="relative mx-auto w-24 h-24">
                        <Avatar className="w-24 h-24 mx-auto">
                          <AvatarImage src={artisan.image} alt={artisan.name} />
                          <AvatarFallback className="bg-gradient-to-r from-amber-100 to-orange-100 text-2xl font-bold">
                            {artisan.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {artisan.verified && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {artisan.name}
                        </h3>
                        <p className="text-amber-600 font-medium text-sm mb-2">
                          {artisan.specialty}
                        </p>
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {renderStars(artisan.avgRating)}
                          <span className="text-sm text-gray-500 ml-1">
                            ({artisan.avgRating})
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {artisan.bio}
                        </p>
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                          <MapPin className="h-4 w-4" />
                          {artisan.location}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {artisan.productCount}
                          </div>
                          <div className="text-xs text-gray-600">Products</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            Rs. {(artisan.totalSales / 1000).toFixed(0)}k
                          </div>
                          <div className="text-xs text-gray-600">Sales</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-gray-800">
                            {new Date(artisan.joinedAt).getFullYear()}
                          </div>
                          <div className="text-xs text-gray-600">Joined</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          asChild
                          className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
                        >
                          <Link href={`/artisans/${artisan.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={artisan.image} alt={artisan.name} />
                          <AvatarFallback className="bg-gradient-to-r from-amber-100 to-orange-100 text-lg font-bold">
                            {artisan.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {artisan.verified && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Award className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-800 truncate">
                            {artisan.name}
                          </h3>
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 text-xs"
                          >
                            {artisan.specialty}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                          {artisan.bio}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {artisan.location}
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(artisan.avgRating)}
                            <span>({artisan.avgRating})</span>
                          </div>
                          <span>{artisan.productCount} products</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/artisans/${artisan.id}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredArtisans.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No artisans found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty(null);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArtisansPage;
