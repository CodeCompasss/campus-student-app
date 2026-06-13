"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export default function UserGuidePage() {
  const router = useRouter()
  return (
    <div className="w-full max-w-3xl mx-auto py-10 px-5 space-y-8">
      <div className="flex justify-start items-center mb-6">
        <button
          className="border text-black border-gray-400 rounded-full p-2"
          onClick={() => router.push("/home")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>
      <h1 className="text-3xl font-bold">Gecian Hub – User Guide</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">📌 Installing the App (PWA)</h2>
        <p>Gecian Hub supports Progressive Web App (PWA) installation on mobile and desktop.</p>
        <h3 className="font-semibold mt-3">How to Install</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            <strong>Mobile (Android / iOS):</strong> Open sidebar → <em>Install App</em> → follow the instructions.
          </li>
          <li>
            <strong>Desktop (Windows / Mac / Linux):</strong> Click the browser’s <em>Install App</em> icon in the URL bar.
          </li>
        </ul>
      </section>

      <hr />

      <section>
        <h2 className="text-xl font-semibold mb-2">🏠 Home Page Features</h2>

        <h3 className="font-semibold mt-3">1. Timetable Viewer</h3>
        <p>
          Upload your timetable as a PDF or image. Tap to view fullscreen. A right-side button allows you
          to return.
        </p>

        <h3 className="font-semibold mt-3">2. College Login</h3>
        <p>Direct shortcut to GEC SKP ETLab login.</p>

        <h3 className="font-semibold mt-3">3. Bus Timings</h3>
        <p>Based on the official PDF released by the college.</p>

        <h3 className="font-semibold mt-3">4. Project Showcase</h3>
        <p>Share your mini and main projects with fellow classmates.</p>

        <h3 className="font-semibold mt-3">5. KTU Login</h3>
        <p>Direct access to KTU student portal.</p>

        <h3 className="font-semibold mt-3">6. SPA Calculator</h3>
        <p>Opens an external SGPA/CGPA calculator website.</p>

        <h3 className="font-semibold mt-3">7. Anonymous Complaint Box</h3>
        <p>
          Redirects to a secure external form. Gecian Hub does not collect, view, or track any complaint
          details.
        </p>

        <h3 className="font-semibold mt-3">8. Hackathons</h3>
        <p>Links to major platforms like Devpost for national and international hackathons.</p>

        <h3 className="font-semibold mt-3">9. College Map (3D)</h3>
        <p>Interactive 3D map of GEC SKP created by a senior student.</p>

        <h3 className="font-semibold mt-3">10. Repetro (Scholarships & Resources)</h3>
        <p>Get previous year questions, scholarships, internships, and research opportunities.</p>

        <h3 className="font-semibold mt-3">11. Clubs</h3>
        <p>View all student clubs and communities in the college.</p>

        <h3 className="font-semibold mt-3">12. Private Hostels</h3>
        <p>List of nearby PGs and hostels around GEC SKP.</p>

        <h3 className="font-semibold mt-3">13. Project Collaboration</h3>
        <p>
          Post your idea, required skills, and find collaborators from any department for interdisciplinary
          projects.
        </p>

        <h3 className="font-semibold mt-3">14. Study Materials</h3>
        <p>Directs to KTU Notes for now. More resources will be added later.</p>

        <h3 className="font-semibold mt-3">15. Attendance</h3>
        <p>Track your personal attendance.</p>

        <h3 className="font-semibold mt-3">16. Finance Tracker</h3>
        <p>Record and manage daily expenses.</p>

        <h3 className="font-semibold mt-3">17. College Calendar</h3>
        <p>Shows college events and upcoming activities.</p>
      </section>

  

      
    </div>
  );
}