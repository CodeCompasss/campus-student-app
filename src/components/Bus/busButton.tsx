"use client";
import { QuickActionButton } from "@/components/QuickActionButton";
import Link from "next/link";
import React from "react";

type BusData = {
  slug: string;
  name: string;
};

export const BusButtons = ({ buses }: { buses: BusData[] }) => {
  return (
    <div className="bg-black min-h-screen pb-24"> 
      <div className="flex flex-col items-center px-4 pt-10">
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-white text-center mb-6">
            Bus Timing
          </h1>

          <div className="space-y-3">
            {buses.map((bus) => (
              <Link key={bus.slug} href={`/bus/${bus.slug}`}>
                <QuickActionButton text={bus.name} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
