"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "../header";
import Image from "next/image";
import {
  Heart,
  Users,
  Globe,
  Award,
  Shield,
  Star,
  ArrowRight,
  HandHeart,
  Mountain,
  Sparkles,
} from "lucide-react";
import { useState, useEffect } from "react";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, value: "500+", label: "Active Artisans" },
    { icon: Heart, value: "10K+", label: "Happy Customers" },
    { icon: Globe, value: "50+", label: "Countries Served" },
    { icon: Award, value: "100%", label: "Authentic Products" },
  ];

  const values = [
    {
      icon: HandHeart,
      title: "Authenticity",
      description:
        "Every product is handcrafted by skilled artisans, preserving traditional techniques and cultural heritage.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Secure transactions and verified artisans ensure a safe marketplace for both buyers and sellers.",
    },
    {
      icon: Mountain,
      title: "Cultural Heritage",
      description:
        "We celebrate Nepal's rich cultural diversity through authentic handmade products and artisan stories.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description:
        "Modern technology meets traditional craftsmanship to create a seamless marketplace experience.",
    },
  ];

  const features = [
    "Advanced product filtering and search",
    "Real-time order tracking",
    "Customer review system",
    "Sales analytics for artisans",
    "Secure payment processing",
    "Mobile-responsive design",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="h-4 w-4" />
                Celebrating Nepali Craftsmanship
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Artisan Nepal
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Connecting the world with authentic Nepali craftsmanship through
                our
                <span className="font-semibold text-amber-600">
                  {" "}
                  modern marketplace
                </span>
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-0">
                    <stat.icon className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Our <span className="text-amber-600">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Artisan Nepal is revolutionizing how handmade products and
                original artwork are bought and sold in Nepal. We provide
                artisans with a dedicated space to showcase their creations,
                enhancing visibility and fostering a supportive community for
                local talent.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform streamlines marketing efforts and ensures secure
                transactions, empowering Nepalese artisans with direct access to
                a broader market while preserving traditional craftsmanship.
              </p>
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl transform rotate-3"></div>
                <Card className="relative bg-white p-8 rounded-2xl shadow-2xl">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-6">
                      <div className="relative h-32 w-32">
                        <Image
                          src="/logo.svg"
                          alt="Artisan Nepal Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
                      Artisan Nepal
                    </h3>
                    <p className="text-center text-gray-600">
                      Bridging tradition with technology to celebrate
                      Nepal&apos;s rich cultural heritage
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Our <span className="text-amber-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide our mission to support Nepali artisans
              and preserve cultural heritage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 group-hover:bg-amber-200 transition-colors duration-300">
                    <value.icon className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Platform <span className="text-amber-600">Features</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our comprehensive platform provides everything artisans and
                customers need for a seamless marketplace experience.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-0 text-center">
                    <Users className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">500+</div>
                    <div className="text-sm text-gray-600">Artisans</div>
                  </CardContent>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-0 text-center">
                    <Globe className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">50+</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 mt-8">
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-0 text-center">
                    <Heart className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">10K+</div>
                    <div className="text-sm text-gray-600">Customers</div>
                  </CardContent>
                </Card>
                <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-0 text-center">
                    <Award className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">100%</div>
                    <div className="text-sm text-gray-600">Authentic</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Future <span className="text-amber-600">Vision</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;re constantly evolving to better serve our community and
              preserve Nepal&apos;s cultural heritage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  AI-Powered Recommendations
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced machine learning algorithms to personalize product
                  suggestions and enhance user experience.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Community Features
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Forums, workshops, and live streaming events to foster deeper
                  community engagement and artisan stories.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Enhanced Security
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced payment integration with multiple secure payment
                  methods for global accessibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the Artisan Nepal Community
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re an artisan looking to showcase your work or a
            customer seeking authentic handmade products, we welcome you to our
            growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105">
              Start Selling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
