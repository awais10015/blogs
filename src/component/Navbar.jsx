"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="fixed top-5 left-0 right-0 mx-auto max-w-4xl rounded-2xl z-50 backdrop-blur-3xl bg-white/10 border-b border-white/20 shadow-md">
      <div className="flex flex-wrap justify-between items-center px-4 md:px-10 py-4 max-w-7xl mx-auto">
        
        <div onClick={() => router.push("/")} className="flex items-center gap-2 hover:scale-110 transition-all duration-200 ease-in-out ">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="text-lg sm:text-xl font-bold text-black tracking-wide">
            BLOGS
          </span>
        </div>

       
        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base font-medium">
          
            <Link
              href="/"
              className="text-black text-lg mt-1 hover:scale-115 transition-all duration-200 ease-in-out  "
            >
              Home
            </Link>
          
          <Button variant="secondary" className="px-4 py-2">
            <Link
              href="/blogs"
              className="text-white w-full text-lg hover:scale-115 transition-all duration-200 ease-in-out hover:text-black "
            >
              View Blogs
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
