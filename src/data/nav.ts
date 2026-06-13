import { Book, Calendar2, Calendar, Home2, Money } from "iconsax-react";

export const bottomTabs = [
  { name: "home", icon: Home2, href: "/", label: "Home" },
  { name: "studymaterial", icon: Book, href: "https://www.ktunotes.in/", label: "Study" },
  { name: "attendance", icon: Calendar2, href: "/attendance/calendar", label: "Attendance" },
  { name: "finance", icon: Money, href: "/expense", label: "Finance" },
  { name: "event", icon: Calendar, href: "/events", label: "Event" },
];
