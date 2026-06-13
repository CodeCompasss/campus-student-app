"use client";

import { busData } from "@/data/bus";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

const BusPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white pb-24"> {/* 👈 bottom nav safe */}
      <div className="px-4 sm:px-6 py-6">
        {/* Back Button */}
        <div className="mb-4">
          <button
            className="border border-gray-400 rounded-full p-2"
            onClick={() => router.push("/home")}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-10 relative">
          <h1 className="text-2xl sm:text-[30px] font-bold">
            College Bus
          </h1>

          <svg
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-3"
            viewBox="0 0 96 12"
          >
            <path
              d="M2 6C8 2,16 10,24 6C32 2,40 10,48 6C56 2,64 10,72 6C80 2,88 10,94 6"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bus Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {busData.map((bus) => (
            <button
              key={bus.slug}
              className="border border-black rounded-lg py-6 text-xl font-bold shadow-sm hover:shadow-md transition"
              onClick={() => router.push(`/bus/${bus.slug}`)}
            >
              {bus.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusPage;
