"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/product/product-list" },
    { name: "Artisans", href: "/artisans" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Track Order", href: "/track" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "#",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "#",
      color: "hover:text-blue-400",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "#",
      color: "hover:text-red-600",
    },
  ];

  const features = [
    { icon: Shield, text: "Secure Payments" },
    { icon: Award, text: "Quality Guaranteed" },
    { icon: Heart, text: "Made with Love" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12">
                  <Image
                    src="/logo.svg"
                    alt="Artisan Nepal"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                    Artisan Nepal
                  </h3>
                  <p className="text-sm text-gray-300">Handmade with Love</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Connecting the world with authentic Nepali craftsmanship through
                our modern marketplace. Every product tells a story of
                tradition, skill, and passion.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-sm text-gray-300">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white">Stay Connected</h4>

              {/* Newsletter */}
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  Subscribe to get updates on new products and artisan stories.
                </p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-amber-400 focus:ring-amber-400"
                  />
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 px-4">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-4 w-4 text-amber-400" />
                  <a
                    href="mailto:support@artisannepal.com"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    support@artisannepal.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <a
                    href="tel:+977-1234567890"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    +977-1234567890
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  <span>Rupandehi, Nepal</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 hover:bg-amber-600 hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span>&copy; {currentYear} Artisan Nepal.</span>
                <span>All rights reserved.</span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
