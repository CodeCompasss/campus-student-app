"use client";

import { useEffect, useMemo, useState } from "react";
import {
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  format,
  isFuture,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import {
  getSubjects,
  getAttendanceStatus,
  setAttendanceStatus,
  addSubject,
  deleteSubject,
} from "@/lib/sc";
import toast from "react-hot-toast";

export const runtime = "edge";

type Status = "present" | "absent" | "duty";

export default function AttendanceCalendarAllSubjects() {
  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all");
  const [query, setQuery] = useState("");
  const [dayLoading, setDayLoading] = useState(false);
  const [perSubjectStatus, setPerSubjectStatus] = useState<
    Record<string, Status>
  >({});
  const [modalOpen, setModalOpen] = useState(false);
  const [monthSummaries, setMonthSummaries] = useState<
    Record<string, Status | "none">
  >({});
  const [calendarFilter, setCalendarFilter] = useState<"all" | Status>("all");
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
      }),
    [currentMonth]
  );

  useEffect(() => {
    (async () => {
      const s = await getSubjects();
      setSubjects(s);
    })();
  }, []);

  const computeSummaryFromStatuses = (statuses: Status[]): Status | "none" => {
    if (statuses.length === 0) return "none";
    // Only consider present status if there are no absences or duties
    if (statuses.every(s => s === "present")) return "present";
    // If any subject is marked as absent, show as absent
    if (statuses.includes("absent")) return "absent";
    // If any subject is on duty, show as duty
    if (statuses.includes("duty")) return "duty";
    // Default to present if there are any statuses but none of the above
    return statuses.length > 0 ? "present" : "none";
  };

  // Compute month summaries for all visible days
  useEffect(() => {
    const compute = async () => {
      if (subjects.length === 0) {
        setMonthSummaries({});
        return;
      }
      const result: Record<string, Status | "none"> = {};
      for (const day of days) {
        const dateStr = format(day, "yyyy-MM-dd");
        if (isFuture(day)) {
          result[dateStr] = "none";
          continue;
        }
        const entries = await Promise.all(
          subjects.map(async (s) => {
            const st = await getAttendanceStatus(s.id, dateStr);
            // Only include defined statuses (not 'none')
            return st === "present" || st === "absent" || st === "duty" ? st : null;
          })
        );
        // Filter out null values before computing summary
        const validEntries = entries.filter((e): e is Status => e !== null);
        result[dateStr] = validEntries.length > 0 
          ? computeSummaryFromStatuses(validEntries) 
          : "none";
      }
      setMonthSummaries(result);
    };
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, currentMonth]);

  const loadStatusesForSelectedDate = async (dateStr: string) => {
    setDayLoading(true);
    const entries = await Promise.all(
      subjects.map(async (s) => {
        const st = await getAttendanceStatus(s.id, dateStr);
        // Only map to status if it's not "none"
        const mapped: Status | null = 
          st === "duty" ? "duty" :
          st === "present" ? "present" :
          st === "absent" ? "absent" : 
          null;
        return [s.id, mapped] as const;
      })
    );
    // Only set status for subjects that have a defined status
    const rec: Record<string, Status> = {};
    for (const [id, st] of entries) {
      if (st !== null) {
        rec[id] = st;
      }
    }
    setPerSubjectStatus(rec);
    setDayLoading(false);
  };

  useEffect(() => {
    loadStatusesForSelectedDate(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, selectedDate]);

  const summarizeDay = (dateStr: string): Status | "none" => {
    // Use precomputed month summaries
    return monthSummaries[dateStr] ?? "none";
  };

  const handleDayClick = async (day: Date) => {
    if (isFuture(day)) return;
    const dateStr = format(day, "yyyy-MM-dd");
    setSelectedDate(dateStr);
    setModalOpen(true);
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    
    try {
      // Add the new subject
      await addSubject(newSubjectName);
      
      // Reload subjects to get the new subject with its ID
      const updatedSubjects = await getSubjects();
      setSubjects(updatedSubjects);
      
      // Just show success message and close the modal
      toast.success('Subject added successfully!');
      setNewSubjectName('');
      setIsAddSubjectOpen(false);
      
      // Refresh the current view to show the new subject
      if (selectedDate) {
        await loadStatusesForSelectedDate(selectedDate);
      }
    } catch (error) {
      toast.error('Failed to add subject. Please try again.');
      console.error('Error adding subject:', error);
    }
  };

  const setStatusForSubject = async (
    subjectId: string,
    status: Status,
    dateStr: string
  ) => {
    await setAttendanceStatus(subjectId, dateStr, status);
    setPerSubjectStatus((prev) => ({ ...prev, [subjectId]: status }));
    // Update the month summary for this date based on updated perSubjectStatus
    setMonthSummaries((prev) => {
      const nextStatuses = { ...perSubjectStatus, [subjectId]: status };
      const list = Object.values(nextStatuses);
      const summary = computeSummaryFromStatuses(list as Status[]);
      return { ...prev, [dateStr]: summary };
    });
    toast.success(
      status === "present"
        ? "Marked present"
        : status === "duty"
        ? "Marked duty"
        : "Marked absent"
    );
  };

  const handleDeleteSubject = async (subjectId: string) => {
    if (!window.confirm('Are you sure you want to delete this subject? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteSubject(subjectId);
      // Update the subjects list
      const updatedSubjects = await getSubjects();
      setSubjects(updatedSubjects);
      
      // If the deleted subject was selected, clear the selection
      if (selectedSubject === subjectId) {
        setSelectedSubject(updatedSubjects[0]?.id || null);
      }
      
      toast.success('Subject deleted successfully');
    } catch (error) {
      toast.error('Failed to delete subject');
      console.error('Error deleting subject:', error);
    }
  };

  return (
   <main className="px-3 sm:px-4 max-w-2xl mx-auto pb-32">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <button
          onClick={() => setIsAddSubjectOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          <span>Add Subject</span>
        </button>
      </div>

      <section className="rounded-xl bg-white shadow p-4 mb-5">
       <header className="mb-4">
  <h2 className="text-lg sm:text-xl font-semibold text-center mb-3">
    {format(currentMonth, "MMMM yyyy")}
  </h2>

  <div className="flex flex-wrap justify-between items-center gap-2">
    <button
      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
      className="text-blue-600 text-sm sm:text-base"
    >
      ← Prev
    </button>

    <select
      className="border border-gray-300 rounded px-2 py-1 text-sm"
      value={calendarFilter}
      onChange={(e) => setCalendarFilter(e.target.value as any)}
    >
      <option value="all">All</option>
      <option value="present">Present</option>
      <option value="absent">Absent</option>
      <option value="duty">Duty</option>
    </select>

    <button
      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
      className="text-blue-600 text-sm sm:text-base"
    >
      Next →
    </button>
  </div>
</header>

        <div className="grid grid-cols-7 gap-2 text-xs font-bold mb-1 select-none">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={`${d}-${i}`} className="uppercase text-center">
              {d}
            </div>
          ))}
        </div>

        {(() => {
          const firstDayOfWeek = startOfMonth(currentMonth).getDay();
          return (
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const summary = summarizeDay(dateStr);
                const isSelected = selectedDate === dateStr;
                let bg = "bg-white border-gray-300";
                if (summary === "present")
                  bg = isSelected
                    ? "bg-green-500 text-white"
                    : "bg-green-100 border-green-400";
                else if (summary === "absent")
                  bg = isSelected
                    ? "bg-red-500 text-white"
                    : "bg-red-100 border-red-300";
                else if (summary === "duty")
                  bg = isSelected
                    ? "bg-yellow-500 text-white"
                    : "bg-yellow-100 border-yellow-300";
                else if (isFuture(day))
                  bg = "bg-gray-100 text-gray-400 cursor-not-allowed";

                const filteredOut =
                  calendarFilter !== "all" &&
                  summary !== calendarFilter &&
                  !isFuture(day);

                return (
                  <button
                    key={dateStr}
                    onClick={() => handleDayClick(day)}
                    disabled={isFuture(day)}
                    aria-pressed={isSelected}
                    title={format(day, "eeee, MMMM do yyyy")}
                    className={`aspect-square min-w-[36px] min-h-[36px] sm:min-w-[42px] sm:min-h-[42px]
                    flex items-center justify-center rounded-full border transition font-semibold
                    focus:outline-none focus:ring-2 focus:ring-blue-400 ${bg}
                    ${filteredOut ? "opacity-30" : ""}
                  `}

                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          );
        })()}

        <div className="flex flex-wrap gap-3 mt-4 justify-center text-xs font-medium text-gray-700 select-none">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-100 rounded-full border border-green-400" />{" "}
            Present
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-100 rounded-full border border-red-400" />{" "}
            Absent
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-yellow-100 rounded-full border border-yellow-400" />{" "}
            Duty
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded-full border border-gray-400" />{" "}
            Future
          </div>
        </div>
      </section>

      {/* Add Subject Modal */}
      {isAddSubjectOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Subject</h2>
              <button 
                onClick={() => {
                  setIsAddSubjectOpen(false);
                  setNewSubjectName('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSubject}>
              <div className="mb-4">
                <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  id="subject-name"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject name"
                  required
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddSubjectOpen(false);
                    setNewSubjectName('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40">
          <div className="bg-white w-full sm:max-w-xl sm:rounded-lg sm:shadow-xl
          p-4 max-h-[80vh] overflow-y-auto overscroll-contain">

            <header className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {format(parseISO(selectedDate), "PPP")}{" "}
                  {dayLoading && " • loading..."}
                </span>
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  aria-label="Filter by status"
                >
                  <option value="all">All</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="duty">Duty</option>
                </select>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search subjects"
                  className="min-w-[140px] border border-gray-300 rounded px-2 py-1 text-sm"
                  aria-label="Search subjects"
                />
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                aria-label="Close"
              >
                Close
              </button>
            </header>

            <ul className="divide-y">
              {subjects
                .filter((s) =>
                  statusFilter === "all"
                    ? true
                    : perSubjectStatus[s.id] === statusFilter
                )
                .filter((s) =>
                  s.name.toLowerCase().includes(query.toLowerCase())
                )
                .map((s) => {
                  const st = perSubjectStatus[s.id];
                  return (
                    <li
                      key={s.id}
                      className="py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-medium">{s.name}</span>
                        {st && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded border ${
                              st === "present"
                                ? "bg-green-50 text-green-700 border-green-300"
                                : st === "absent"
                                ? "bg-red-50 text-red-700 border-red-300"
                                : "bg-yellow-50 text-yellow-700 border-yellow-300"
                            }`}
                          >
                            {st}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 items-center justify-end">

                        <button
                          onClick={() =>
                            setStatusForSubject(s.id, "present", selectedDate)
                          }
                          className={`px-3 py-1 rounded transition ${
                            st === "present"
                              ? "bg-green-500 text-white"
                              : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          disabled={st === "present"}
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            setStatusForSubject(s.id, "absent", selectedDate)
                          }
                          className={`px-3 py-1 rounded transition ${
                            st === "absent"
                              ? "bg-red-500 text-white"
                              : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          disabled={st === "absent"}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() =>
                            setStatusForSubject(s.id, "duty", selectedDate)
                          }
                          className={`px-3 py-1 rounded transition ${
                            st === "duty"
                              ? "bg-yellow-500 text-white"
                              : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                          disabled={st === "duty"}
                        >
                          Duty
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSubject(s.id);
                          }}
                          className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete subject"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  );
                })}
              {subjects.length === 0 && (
                <li className="py-6 text-center text-gray-500">
                  No subjects yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
