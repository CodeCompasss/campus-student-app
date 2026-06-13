export type EventItem = {
  id: string;
  title: string;
  slug: string;
  venue: string;
  date: string; // ISO date string e.g. 2025-09-01
  time: string; // e.g. 10:00 AM – 12:00 PM
  image: string; // public path
  description: string;
  category?: string; // optional category for filtering
};

export const eventsData: EventItem[] = [
  {
    id: "1",
    title: "Hackathon 1.0",
    slug: "hackathon-1",
    venue: "Main Auditorium",
    date: "2025-09-10",
    time: "10:00 AM – 10:00 PM",
    image: "/images/FingerprintImg.png",
    description:
      "Join us for a 12-hour coding sprint. Teams will build solutions to real-world problems and present to judges.",
    category: "tech",
  },
  {
    id: "2",
    title: "Tech Talk: PWA Best Practices",
    slug: "pwa-best-practices",
    venue: "Seminar Hall 2",
    date: "2025-10-05",
    time: "2:00 PM – 3:30 PM",
    image: "/icons/icon-512.png",
    description:
      "A deep dive into Progressive Web Apps, covering manifests, service workers, caching, and performance.",
    category: "talk",
  },
  {
    id: "3",
    title: "Robotics Workshop",
    slug: "robotics-workshop",
    venue: "Lab 4",
    date: "2025-08-20",
    time: "9:00 AM – 1:00 PM",
    image: "/icons/icon-256.png",
    description:
      "Hands-on session introducing basic robotics with microcontrollers and sensors. Limited seats.",
    category: "workshop",
  },
];
