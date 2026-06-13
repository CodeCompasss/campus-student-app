"use client";

import { useState, useEffect } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isToday,
  // isPast,
  isFuture,
  parseISO,
  addMonths,
  subMonths,
  // isSameDay,
} from "date-fns";
import {
  getAttendanceByDate,
  getAllSubjects,
  markAttendance,
  getAttendanceStatus,
} from "@/lib/sc";
import toast from "react-hot-toast";

export default function CommonCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [attendanceForDay, setAttendanceForDay] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  useEffect(() => {
    const loadSubjects = async () => {
      const subs = await getAllSubjects();
      setSubjects(subs);
      if (subs.length > 0 && subs[0]) {
        setSelectedSubject(subs[0].id);
      }
    };
    loadSubjects();
  }, []);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const handleDateClick = async (date: string, day: Date) => {
    setSelectedDate(date);
    const marked = await getAttendanceByDate(date);
    setAttendanceForDay(marked.map((r) => r.subjectId));

    // If it's today, allow marking attendance
    if (isToday(day)) {
      handleMarkAttendance(date);
    }
  };

  const handleMarkAttendance = async (date: string) => {
    if (!selectedSubject) return;

    try {
      await markAttendance(selectedSubject, date);
      toast.success("Attendance marked!");

      // Refresh data
      const marked = await getAttendanceByDate(date);
      setAttendanceForDay(marked.map((r) => r.subjectId));
    } catch (error) {
      let errorMessage = "Failed to mark attendance";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast.error(errorMessage);
    }
  };

  // const getDayStatus = async (day: Date) => {
  //   const dateStr = format(day, "yyyy-MM-dd");

  //   if (isFuture(day)) return "future";
  //   if (isToday(day)) return "today";

  //   if (selectedSubject) {
  //     const status = await getAttendanceStatus(selectedSubject, dateStr);
  //     return status;
  //   }

  //   return "absent";
  // };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSelectedDate(null);
    setAttendanceForDay([]);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDate(null);
    setAttendanceForDay([]);
  };

  const getDayClassName = (day: Date, status: string) => {
    const baseClasses =
       "aspect-square min-w-[36px] min-h-[36px] sm:min-w-[42px] sm:min-h-[42px]flex items-center justify-center rounded-full border transition focus:outline-none focus:ring-2 focus:ring-blue-400";

    const todayHighlight = isToday(day);
    const isSelected = selectedDate === format(day, "yyyy-MM-dd");

    if (isFuture(day)) {
      return `${baseClasses} bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200`;
    }

    if (todayHighlight) {
      return `${baseClasses} border-blue-500 font-semibold text-blue-600 ${
        isSelected
          ? "bg-blue-600 text-white shadow-lg scale-105"
          : "hover:bg-blue-100"
      }`;
    }

    switch (status) {
      case "present":
        return `${baseClasses} bg-green-100 border-green-300 text-green-800 ${
          isSelected
            ? "bg-green-500 text-white shadow-lg"
            : "hover:bg-green-200"
        }`;
      case "absent":
        return `${baseClasses} bg-red-100 border-red-300 text-red-800 ${
          isSelected ? "bg-red-500 text-white shadow-lg" : "hover:bg-red-200"
        }`;
      default:
        return `${baseClasses} border-gray-300 text-gray-700 ${
          isSelected ? "bg-blue-600 text-white shadow-lg" : "hover:bg-blue-100"
        }`;
    }
  };

  const DayButton = ({
    day,
    selectedSubject,
  }: {
    day: Date;
    selectedSubject: string | null;
  }) => {
    const [status, setStatus] = useState<
      "present" | "absent" | "future" | "today"
    >("absent");
    const [isLoading, setIsLoading] = useState(true);

    const dateStr = format(day, "yyyy-MM-dd");
    const isDisabled = isFuture(day) || !selectedSubject;

    useEffect(() => {
      const fetchDayStatus = async () => {
        setIsLoading(true);
        try {
          if (isFuture(day)) {
            setStatus("future");
          } else if (isToday(day)) {
            setStatus("today");
          } else {
            const result = await getAttendanceStatus(
              selectedSubject || "",
              dateStr
            );
            setStatus(result === "present" ? "present" : "absent");
          }
        } catch (error) {
          console.error("Error fetching day status:", error);
          setStatus("absent");
        } finally {
          setIsLoading(false);
        }
      };

      fetchDayStatus();
    }, [day, selectedSubject, dateStr]);

    if (isLoading) {
      return (
        <button
          disabled
          className="aspect-square flex items-center justify-center rounded-full border border-gray-300 bg-gray-100"
        >
          {day.getDate()}
        </button>
      );
    }

    return (
      <button
        key={dateStr}
        onClick={() => !isDisabled && handleDateClick(dateStr, day)}
        aria-pressed={selectedDate === dateStr}
        title={format(day, "eeee, MMMM do yyyy")}
        disabled={isDisabled}
        className={getDayClassName(day, status)}
        style={{ willChange: "transform" }}
      >
        {day.getDate()}
        {isToday(day) && (
          <div className="text-xs mt-1">{status === "present" ? "✓" : ""}</div>
        )}
      </button>
    );
  };

  // Then in your calendar render:

  return (
    <section className="mt-6 bg-white rounded-xl shadow-md p-4 sm:p-6
  max-w-md mx-auto mb-32">

            <header className="mb-4">
              {/* Month title centered ABOVE calendar */}
              <h2 className="text-lg sm:text-2xl font-semibold text-center mb-3">
                {format(currentMonth, "MMMM yyyy")}
              </h2>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center px-2">
                <button
                  onClick={prevMonth}
                  className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  ← Prev
                </button>

                <button
                  onClick={nextMonth}
                  className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  Next →
                </button>
              </div>
            </header>



      {subjects.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Subject
          </label>
          <select
            className="w-full p-2 border rounded"
            value={selectedSubject || ""}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-7 gap-3 text-center text-sm font-semibold text-gray-600 select-none">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d} className="uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

       <div className="grid grid-cols-7 gap-2 sm:gap-3 mt-2 text-center text-sm sm:text-base">

        {days.map((day) => (
          <DayButton
            key={format(day, "yyyy-MM-dd")}
            day={day}
            selectedSubject={selectedSubject}
          />
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-700 select-none">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-green-100 rounded-full border border-green-400"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-100 rounded-full border border-red-400"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-100 rounded-full border border-blue-400"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-400"></div>
          <span>Future</span>
        </div>
      </div>

      {selectedDate && (
        <div className="mt-8 border border-gray-200 rounded-lg p-5 bg-gray-50 shadow-sm animate-fadeIn">
          <h3 className="font-semibold text-lg mb-4 text-gray-700 text-center">
            📅 Attendance on{" "}
            <time
              dateTime={selectedDate}
              className="text-blue-600 font-semibold"
            >
              {format(parseISO(selectedDate), "PPP")}
            </time>
          </h3>
          <ul className="divide-y divide-gray-200 max-h-56 sm:max-h-64 overflow-y-auto overscroll-contain">

            {subjects.length === 0 && (
              <li className="text-center py-4 text-gray-500">
                No subjects found.
              </li>
            )}
            {subjects.map((s) => {
              const present = attendanceForDay.includes(s.id);
              return (
                <li
                  key={s.id}
                  className={`flex justify-between items-center p-3 rounded-md transition-colors
                    ${present ? "bg-green-100" : "bg-red-100"}
                    animate-scaleIn
                  `}
                >
                  <span className="font-medium text-gray-800">{s.name}</span>
                  <span
                    className={`font-semibold ${
                      present ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {present ? "✅ Present" : "❌ Absent"}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease forwards;
        }
      `}</style>
    </section>
  );
}
