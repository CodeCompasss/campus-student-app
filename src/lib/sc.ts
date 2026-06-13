import { eachDayOfInterval, isWeekend, addDays } from "date-fns";

function getTodayDateString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
}

// LocalStorage keys
const LS_SUBJECTS = "attendance_subjects";
const LS_ATTENDANCE = "attendance_records";

type Subject = { id: string; name: string; createdAt: string };
type AttendanceRecord = { id: string; subjectId: string; date: string; status: "present"|"absent"|"duty" };

function readSubjects(): Subject[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LS_SUBJECTS);
  try { return raw ? (JSON.parse(raw) as Subject[]) : []; } catch { return []; }
}
function writeSubjects(list: Subject[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_SUBJECTS, JSON.stringify(list));
}
function readAttendance(): AttendanceRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(LS_ATTENDANCE);
  try { return raw ? (JSON.parse(raw) as AttendanceRecord[]) : []; } catch { return []; }
}
function writeAttendance(list: AttendanceRecord[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_ATTENDANCE, JSON.stringify(list));
}

// ------ SUBJECTS

export const addSubject = async (name: string) => {
  let created = new Date();
  // If today is Saturday (6), add 2 days; if Sunday (0), add 1 day
  if (created.getDay() === 6) {
    created = addDays(created, 2);
  } else if (created.getDay() === 0) {
    created = addDays(created, 1);
  }
  const subs = readSubjects();
  subs.push({ id: crypto.randomUUID(), name, createdAt: created.toISOString().slice(0, 10) });
  writeSubjects(subs);
};

export const getSubjects = async () => readSubjects();

export const getAllSubjects = getSubjects;

export const getSubjectById = async (subjectId: string) => readSubjects().find(s => s.id === subjectId) || null;

export const deleteSubject = async (subjectId: string) => {
  const subs = readSubjects().filter(s => s.id !== subjectId);
  writeSubjects(subs);
  const att = readAttendance().filter(a => a.subjectId !== subjectId);
  writeAttendance(att);
};

// ------ ATTENDANCE

// Mark present for a specific date (defaults to today)
export const markAttendance = async (subjectId: string, dateInput?: string) => {
  const todayStr = getTodayDateString();
  const date = dateInput || todayStr;
  const id = `${subjectId}_${date}`;
  const list = readAttendance();
  const idx = list.findIndex(r => r.id === id);
  const rec: AttendanceRecord = { id, subjectId, date, status: "present" };
  if (idx >= 0) list[idx] = rec; else list.push(rec);
  writeAttendance(list);
};

// Undo (unmark) attendance: remove present mark for a given date
export const unmarkAttendance = async (subjectId: string, dateInput?: string) => {
  const todayStr = getTodayDateString();
  const date = dateInput || todayStr;
  const id = `${subjectId}_${date}`;
  const list = readAttendance();
  const idx = list.findIndex(r => r.id === id);
  const rec: AttendanceRecord = { id, subjectId, date, status: "absent" };
  if (idx >= 0) list[idx] = rec; else list.push(rec);
  writeAttendance(list);
};

// Set duty leave
export const setDutyLeave = async (subjectId: string, dateInput?: string) => {
  const todayStr = getTodayDateString();
  const date = dateInput || todayStr;
  const id = `${subjectId}_${date}`;
  const list = readAttendance();
  const idx = list.findIndex(r => r.id === id);
  const rec: AttendanceRecord = { id, subjectId, date, status: "duty" };
  if (idx >= 0) list[idx] = rec; else list.push(rec);
  writeAttendance(list);
};

// Generic setter
export const setAttendanceStatus = async (subjectId: string, date: string, status: "present"|"absent"|"duty") => {
  const id = `${subjectId}_${date}`;
  const list = readAttendance();
  const idx = list.findIndex(r => r.id === id);
  const rec: AttendanceRecord = { id, subjectId, date, status };
  if (idx >= 0) list[idx] = rec; else list.push(rec);
  writeAttendance(list);
};

// Retrieve attendance records by subject
export const getAttendanceBySubject = async (subjectId: string) => readAttendance().filter(a => a.subjectId === subjectId);

// Retrieve attendance records for all subjects on a date
export const getAttendanceByDate = async (date: string) => readAttendance().filter(a => a.date === date);

// Get attendance status for a subject on a date ("present" | "absent" | "duty" | "none")
export const getAttendanceStatus = async (subjectId: string, date: string): Promise<"present" | "absent" | "duty" | "none"> => {
  const id = `${subjectId}_${date}`;
  const record = readAttendance().find(r => r.id === id);
  if (!record) return "none";
  return record.status;
};

// ------ STATS

export const getAttendanceStats = async (subjectId: string) => {
  const subject = readSubjects().find(s => s.id === subjectId);

  if (!subject) {
    return { present: 0, total: 0, percent: 0 };
  }

  const allAttendance = readAttendance();
  const subjectRecords = allAttendance.filter((a) => a.subjectId === subjectId);

  // Present days set
  const presentDates = new Set(
    subjectRecords.filter((r) => r.status === "present").map((r) => r.date)
  );
  const present = presentDates.size;

  // Use subject creation date as start date
  const startDate = new Date(subject.createdAt);
  const endDate = new Date(getTodayDateString());

  // Count all possible weekdays between [startDate, endDate], inclusive
  const intervalDays = eachDayOfInterval({ start: startDate, end: endDate });
  const validDays = intervalDays.filter((day) => !isWeekend(day));
  const total = validDays.length;

  const percent = total === 0 ? 0 : Math.round((present / total) * 100);

  return {
    present,
    total,
    percent,
  };
};

// ----------

export const isMarked = async (subjectId: string) => {
  const id = `${subjectId}_${getTodayDateString()}`;
  return readAttendance().some(r => r.id === id && r.status === "present");
};
