"use client";

import { notFound, useRouter } from "next/navigation";
import { busRoutes } from "@/data/busRoutes";
import { ArrowLeftIcon } from "lucide-react";

export default function BusRoutePage({
  params,
}: {
  params: { busNumber: string };
}) {
  const router = useRouter();
  const bus = busRoutes.find((b) => b.slug === params.busNumber);

  if (!bus) return notFound();

  return (
    <div className="min-h-screen bg-white text-black px-4 pt-6 pb-28"> {/* 👈 bottom nav safe */}
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="border border-gray-400 rounded-full p-2"
          onClick={() => router.push("/bus")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Heading */}
      <div className="text-center mb-8 relative">
        <h1 className="text-2xl sm:text-3xl font-bold">{bus.title}</h1>

        <svg
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-3"
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-black text-sm sm:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Sl. No</th>
              <th className="p-2 border">Boarding Point</th>
              <th className="p-2 border">FN</th>
              <th className="p-2 border">AN</th>
            </tr>
          </thead>
          <tbody>
            {bus.routes.map((item) => (
              <tr key={item.slNo}>
                <td className="p-2 border">{item.slNo}</td>
                <td className="p-2 border">{item.point}</td>
                <td className="p-2 border">{item.fn}</td>
                <td className="p-2 border">{item.an}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back link */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => router.push("/bus")}
          className="px-4 py-2 border rounded-md hover:bg-gray-100"
        >
          Back to Bus List
        </button>
      </div>
    </div>
  );
}
