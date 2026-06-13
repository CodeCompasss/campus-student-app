'use client';

import { useState } from 'react';
import ClubCard from './ClubCard';
import clubData from '@/data/club';
import { ArrowLeftIcon, Filter } from "lucide-react";
import { useRouter } from 'next/navigation';

type FilterType = 'all' | 'tech' | 'non-tech';

export default function ClubList() {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  // ✅ CATEGORY BASED FILTER
  const filteredClubs = clubData.filter(club => {
    if (filter === 'all') return true;
    return club.category === filter;
  });

  return (
    <div className="p-4 min-h-screen text-white pb-24">
      <div className="flex justify-between items-center mb-2">
        <button
          className="border text-black border-gray-400 rounded-full p-2"
          onClick={() => router.push('/home')}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <div className="relative flex-shrink-0 w-fit mx-auto mb-6">
          <h1 className="text-4xl text-black font-bold text-center">Club</h1>
          <img
            className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[50%]"
            src="/wave-line.svg"
            alt="wave underline"
          />
        </div>

        <div className="relative">
          <button
            className="border text-black border-gray-400 rounded-full p-2"
            onClick={() => setFilterOpen(prev => !prev)}
          >
            <Filter className="w-5 h-5" />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg z-10">
              {[
                { label: 'All Clubs', value: 'all' },
                { label: 'Tech Clubs', value: 'tech' },
                { label: 'Non-Tech Clubs', value: 'non-tech' },
              ].map(item => (
                <button
                  key={item.value}
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-200 ${
                    filter === item.value ? 'font-semibold bg-gray-100' : ''
                  }`}
                  onClick={() => {
                    setFilter(item.value as FilterType);
                    setFilterOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map(club => (
          <ClubCard key={club.slug} club={club} />
        ))}
      </div>
    </div>
  );
}
