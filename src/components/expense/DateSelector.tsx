'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

type DateItem = {
  iso: string;
  date: number;
  day: string;
  fullDate: Date;
  month: string;
  year: number;
};

type DateSelectorProps = {
  selectedDate: string; // typically 'YYYY-MM-DD'
  onDateChange: (date: string) => void;
};

function buildDatesAround(base: Date, before = 15, after = 15): DateItem[] {
  const dates: DateItem[] = [];
  for (let i = -before; i <= after; i++) {
    const d = new Date(base.getTime());
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split('T')[0] || '';
    dates.push({
      date: d.getDate(),
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: d,
      iso,
      month: d.toLocaleDateString('en-US', { month: 'long' }),
      year: d.getFullYear(),
    });
  }
  return dates;
}


export default function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  const [dates, setDates] = useState<DateItem[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledOnce = useRef(false);
  const EXTEND_CHUNK = 30;

  useEffect(() => {
    const initialDates = buildDatesAround(new Date(), 15, 15);
    setDates(initialDates);
  }, []);

  // 2. Center the selected date
  useEffect(() => {
    if (!selectedDate || !containerRef.current) return;

    let index = dates.findIndex((d) => d.iso === selectedDate);
    if (index === -1) {
      // extend list around selectedDate to include it
      const base = new Date(selectedDate);
      const extended = buildDatesAround(base, EXTEND_CHUNK, EXTEND_CHUNK);
      setDates((prev) => {
        // merge without duplicates
        const map = new Map<string, DateItem>();
        [...prev, ...extended].forEach((it) => map.set(it.iso, it));
        return Array.from(map.values()).sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
      });
      return;
    }

    const container = containerRef.current;
    const item = container.children[index] as HTMLElement;
    if (!item) return;

    const scrollPosition =
      item.offsetLeft - container.clientWidth / 2 + item.clientWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: hasScrolledOnce.current ? 'smooth' : 'auto',
    });

    hasScrolledOnce.current = true;
  }, [selectedDate, dates]);

  const onScroll = useCallback(() => {
    const container = containerRef.current;
    const localDates = dates;
    if (!container || localDates.length === 0) return;

    const nearLeft = container.scrollLeft < 40;
    const nearRight = container.scrollWidth - container.clientWidth - container.scrollLeft < 40;

    if (nearLeft) {
      const first = localDates[0]?.fullDate;
      if (first) {
        const before = buildDatesAround(new Date(first), EXTEND_CHUNK, 0);
        setDates((prev) => [...before.slice(0, EXTEND_CHUNK), ...prev]);
        container.scrollLeft += 58 * EXTEND_CHUNK; // keep visual position roughly stable
      }
    }
    if (nearRight) {
      const last = localDates[localDates.length - 1]?.fullDate;
      if (last) {
        const after = buildDatesAround(new Date(last), 0, EXTEND_CHUNK);
        setDates((prev) => [...prev, ...after.slice(1)]);
      }
    }
  }, [dates]);

//  
return (
    <div className="w-full">
      {/* Month / Year Header */}
      {selectedDate && (
        <div className="sticky top-0 bg-white z-10 py-2">
          <h2 className="text-center text-sm sm:text-base font-semibold">
            {new Date(selectedDate).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </h2>
        </div>
      )}

      {/* Date scroller */}
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="
          flex
          gap-2 sm:gap-3
          overflow-x-auto
          overflow-y-hidden
          px-2 sm:px-4
          scrollbar-hide
        "
      >
        {dates.map(({ day, date, iso }) => {
          const active = iso === selectedDate;

          return (
            <button
              key={iso}
              onClick={() => onDateChange(iso)}
              className={`
                flex-shrink-0
                w-14 h-20 sm:w-16 sm:h-24
                rounded-xl
                border-2
                flex flex-col
                items-center
                justify-center
                transition-all duration-200
                ${
                  active
                    ? 'bg-blue-500 text-white border-blue-500 scale-105'
                    : 'bg-white text-black border-gray-300 hover:border-blue-400'
                }
              `}
            >
              <span
                className={`text-xs ${
                  active ? 'text-white/80' : 'text-gray-500'
                }`}
              >
                {day}
              </span>
              <span className="text-lg font-bold">{date}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}