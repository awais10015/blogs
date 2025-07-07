import React from "react";
import { Globe } from "@/components/magicui/globe";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col mt-30 lg:flex-row items-center justify-center gap-10 p-6">
      
      <div className="flex-shrink-0">
        <Globe />
      </div>

     
      <div className="text-center lg:text-left max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#2E4F21] leading-tight">
          Empower Your Ideas. Build the Future.
        </h1>
        <p className="text-lg sm:text-2xl font-medium text-[#2E4F21] mt-4">
          Welcome to MyApp — the ultimate platform designed to turn your vision
          into reality. Whether you're a creator, developer, or entrepreneur, we
          help you unlock your potential with powerful tools and seamless
          experiences.
        </p>

        <div className="mt-6">
          <Button variant="secondary" className="px-4 w-40 py-2 hover:scale-115">
            <Link
              href="/blogs"
              className="text-white w-full text-lg hover:scale-115 hover:text-black transition duration-150"
            >
              View Blogs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
