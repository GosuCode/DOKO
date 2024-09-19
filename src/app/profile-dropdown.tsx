"use client";

import { useState } from "react";
import Image from "next/image";
import { SignOut } from "../components/sign-out";
import SignIn from "../components/sign-in";
import Link from "next/link";

type ProfileDropdownProps = {
  profileImage: string | null;
  userName: string;
};

export default function ProfileDropdown({
  profileImage,
  userName,
  session,
}: ProfileDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-1 right-7">
      <div
        className="relative w-15 h-15 rounded-full overflow-hidden cursor-pointer"
        onClick={menuToggle}
      >
        <Image
          src={profileImage as string}
          alt="Profile"
          width={50}
          height={50}
        />
      </div>
      <div
        className={`absolute top-16 right-0 p-4 bg-[#f5f3ff] w-52 rounded-xl shadow-lg transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible top-20" : "opacity-0 invisible"
        }`}
      >
        <div className="before:content-[''] before:absolute before:top-[-5px] before:right-[28px] before:w-5 before:h-5 before:bg-[#f5f3ff] before:rotate-45"></div>
        <h3 className="text-center text-lg font-bold text-gray-600 leading-snug mb-4">
          {userName}
          <br />
          <span className="text-sm text-gray-400 font-light">
            Website Designer
          </span>
        </h3>
        <ul>
          <li className="flex items-center py-4 border-t border-gray-100 hover:text-palette-primary">
            <Link
              href="/dashboard"
              className="font-medium text-gray-600 hover:text-palette-primary"
            >
              Dashboard
            </Link>
          </li>
          <li className="flex items-center py-4 border-t border-gray-100 hover:text-palette-primary">
            <Link
              href="/product/cart"
              className="font-medium text-gray-600 hover:text-palette-primary"
            >
              Inbox
            </Link>
          </li>
          <li className="flex items-center py-4 border-t border-gray-100 hover:text-palette-primary">
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-palette-primary"
            >
              Settings
            </a>
          </li>
          <li className="flex items-center py-4 border-t border-gray-100 hover:text-palette-primary">
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-palette-primary"
            >
              Help
            </a>
          </li>
          <li className="flex items-center py-4 border-t border-gray-100 hover:text-palette-primary">
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-palette-primary"
            >
              {session ? <SignOut /> : <SignIn />}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
