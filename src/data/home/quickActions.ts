export type QuickAction =
  | { text: string; type: "external"; url: string }
  | { text: string; type: "route"; path: string }
  | { text: string; type: "alert"; message: string };

export const quickActions: QuickAction[] = [
  { text: "College Login", type: "external", url: "https://gecskp.etlab.in/user/login" },
  { text: "Bus Time", type: "route", path: "/bus" },
  { text: "Project Showcase",  type: "external", url: "https://gecian-archive.netlify.app/" },
  { text: "Ktu login ", type: "external", url: "https://app.ktu.edu.in/login.htm" },
  { text: "SGPA Calculator", type: "external", url: "https://ktugpa.web.app/" },
  { text: "Anonymous Complaint", type: "external", url: "https://www.freesuggestionbox.com/pub/zldiokq" },
  { text: "Hackathon", type: "external", url: "https://devpost.com/hackathons" },
  { text: "College Map", type: "external", url: "https://app.mappedin.com/map/65fbc2aa7c0c4fe5b4cc4683/directions?floor=m_c235d70c9e691132&location=s_fca685ba2c784ab7&departure=s_c0ed60b6daeada7c" },
  { text: "Repeto", type: "external", url: "https://codecompasss.github.io/repeto/" },
  { text: "Club", type: "route", path: "/club" },
  { text: "Private Hostel", type: "external", url: "https://gecian-hostel.netlify.app/" },
  { text: "Project Collobaration", type: "external", url: "https://gecian-project-collobroation.netlify.app/" },

];
