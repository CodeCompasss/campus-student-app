// app/terms/page.tsx
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export default function TermsPage() {
  const updatedDate = new Date().toLocaleDateString();
  const router = useRouter()
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-black space-y-10">
      <div className="flex justify-start items-center mb-6">
        <button
          className="border text-black border-gray-400 rounded-full p-2"
          onClick={() => router.push("/home")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>
      {/* Page header */}
      <header>
        <h1 className="text-3xl font-bold mb-2">Gecian Hub — Legal & Policies</h1>
        <p className="text-sm text-slate-600">Last Updated: {updatedDate}</p>
      </header>

      {/* 1. Terms & Conditions */}
      <section id="terms" className="prose">
        <h2 className="text-2xl font-semibold mt-4">Terms & Conditions</h2>
        <p>
          Welcome to <strong>Gecian Hub</strong> ("Platform"). By accessing or using this Platform,
          you ("User") agree to the following Terms & Conditions. If you do not agree, stop using
          the Platform immediately.
        </p>

        <h3 className="font-semibold mt-4">1. Nature of the Platform</h3>
        <ul className="list-disc ml-6">
          <li>
            Gecian Hub is an <strong>independent, student-run application</strong> created for
            informational and community use.
          </li>
          <li>The main code is developed by the <strong>CodeCompass</strong> GitHub organization.</li>
          <li>
            The Platform is deployed and operated independently by students and is <strong>not
            endorsed</strong> or managed by any college or authority.
          </li>
        </ul>

        <h3 className="font-semibold mt-4">2. No Institutional Responsibility</h3>
        <p>
          Colleges, departments, faculty, or administrative bodies have no legal, academic, or
          disciplinary responsibility for content or activity on this Platform.
        </p>

        <h3 className="font-semibold mt-4">3. Developer & Maintainer Disclaimer</h3>
        <ul className="list-disc ml-6">
          <li>The Platform is provided <strong>as-is</strong> without warranties.</li>
          <li>Contributors, CodeCompass, and student hosts do not operate or supervise the Platform.</li>
          <li>No contributor accepts liability for misuse, technical issues, or data errors.</li>
        </ul>

        <h3 className="font-semibold mt-4">4. User Responsibility</h3>
        <ul className="list-disc ml-6">
          <li>Users are responsible for content they upload and actions they take.</li>
          <li>Users must comply with applicable laws and college rules.</li>
          <li>Consequences arising from misuse (legal, academic, or disciplinary) are the User's responsibility.</li>
        </ul>

        <h3 className="font-semibold mt-4">5. Content & Conduct</h3>
        <p>Users must not upload or share:</p>
        <ul className="list-disc ml-6">
          <li>Illegal or harmful content</li>
          <li>Harassment, threats, or abusive messages</li>
          <li>Copyrighted material without permission</li>
          <li>False or misleading information</li>
        </ul>

        <h3 className="font-semibold mt-4">6. Data & Privacy (short)</h3>
        <p>We collect minimal functional data required for the site to operate. Do not upload sensitive personal or institutional data.</p>

        <h3 className="font-semibold mt-4">7. No Liability</h3>
        <p>
          To the maximum extent permitted by law, neither the Platform nor its contributors shall be liable for loss, damage, service interruptions, or other consequences arising from use.
        </p>

        <h3 className="font-semibold mt-4">8. Third-Party Links</h3>
        <p>The Platform may link to external services (KTU, Devpost, SPA calculators). We are not responsible for external sites' content or policies.</p>

        <h3 className="font-semibold mt-4">9. Modification & Termination</h3>
        <p>Features may change or the Platform may be discontinued at any time without prior notice.</p>

        <h3 className="font-semibold mt-4">10. Governing Law & Acceptance</h3>
        <p>
          These Terms are governed by the laws applicable in India. By using the Platform you accept these Terms and agree that developers, maintainers, and institutions bear no responsibility for your actions.
        </p>
      </section>

      {/* 2. Privacy Policy */}
      <section id="privacy" className="prose">
        <h2 className="text-2xl font-semibold mt-4">Privacy Policy</h2>
        <p>Gecian Hub prioritizes privacy. This section explains what we collect and how we handle data.</p>

        <h3 className="font-semibold mt-4">1. Information We Collect</h3>
        <ul className="list-disc ml-6">
          <li>Minimal anonymous usage logs for improving the app.</li>
          <li>Content you voluntarily upload (project files, text posts).</li>
        </ul>

        <h3 className="font-semibold mt-4">2. What We Do NOT Collect</h3>
        <ul className="list-disc ml-6">
          <li>We do not collect passwords, institutional credentials, or government IDs.</li>
          <li>No automatic location tracking or sensitive academic/financial data.</li>
        </ul>

        <h3 className="font-semibold mt-4">3. How We Use Data</h3>
        <ul className="list-disc ml-6">
          <li>To operate core features and moderate content.</li>
          <li>To improve usability and diagnose issues.</li>
        </ul>

        <h3 className="font-semibold mt-4">4. Data Removal & Your Rights</h3>
        <p>You may request deletion or correction of content you uploaded by contacting the student moderators listed in the app.</p>

        <h3 className="font-semibold mt-4">5. Third-Party Services</h3>
        <p>External links (KTU, SPA calculators, Devpost, etc.) have their own privacy policies. We are not responsible for their practices.</p>
      </section>

      {/* 3. DMCA / Content Removal Policy */}
      <section id="dmca" className="prose">
        <h2 className="text-2xl font-semibold mt-4">DMCA / Content Removal Policy</h2>
        <p>We respect intellectual property. If you believe content on the Platform infringes your rights, submit a removal request.</p>

        <h3 className="font-semibold mt-4">1. Grounds for Removal</h3>
        <ul className="list-disc ml-6">
          <li>Copyright infringement or plagiarism</li>
          <li>Personal data published without consent</li>
          <li>Illegal or abusive content</li>
        </ul>

        <h3 className="font-semibold mt-4">2. How to Request Removal</h3>
        <p>Provide:</p>
        <ul className="list-disc ml-6">
          <li>Link to the content</li>
          <li>Description of the violation</li>
          <li>Proof of ownership (if applicable)</li>
          <li>Your contact information</li>
        </ul>

        <h3 className="font-semibold mt-4">3. Review & Action</h3>
        <p>Student moderators will review requests and may remove content that violates policies. Because we are a student-run platform, response times may vary.</p>

        <h3 className="font-semibold mt-4">4. No Legal Guarantee</h3>
        <p>Removal by moderators does not substitute for legal action; we cannot provide legal resolution but will act on valid reports.</p>
      </section>

      {/* 4. Disclaimer */}
      <section id="disclaimer" className="prose">
        <h2 className="text-2xl font-semibold mt-4">Disclaimer</h2>
        <p>All content is provided for convenience. The Platform is unofficial and student-run.</p>

        <h3 className="font-semibold mt-4">1. No Official Affiliation</h3>
        <p>The Platform is not affiliated with any college, department, or governing body.</p>

        <h3 className="font-semibold mt-4">2. Accuracy Not Guaranteed</h3>
        <p>We strive for accuracy, but information (e.g., bus times, timetables) may be incorrect or outdated — verify independently.</p>

        <h3 className="font-semibold mt-4">3. No Advice</h3>
        <p>Nothing here is professional, legal, or academic advice. Use at your own discretion.</p>
      </section>

      {/* Final note / contact */}
      <section id="final" className="prose">
        <h2 className="text-2xl font-semibold mt-4">Final Note & Contact</h2>
        <p>
          By using Gecian Hub you agree to all policies on this page. For policy, takedown, or privacy requests, contact the student maintainers . We do not handle official college administration requests — do not contact CodeCompass or college authorities for day-to-day moderation.
        </p>
      </section>

      <div className="h-10" />
    </div>
  );
}
