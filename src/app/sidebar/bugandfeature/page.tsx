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
     <hr />
<section className="space-y-4">
  <h2 className="text-xl font-semibold">🐞 Bugs, Features & Contributions</h2>

  <p className="text-gray-700">
    Gecian Hub is built for students, and your feedback helps us make it better.
    Whether something is not working correctly, you have an idea for improvement,
    or you want to help build the platform — this section explains how you can do that.
  </p>

  {/* Reporting Bugs */}
  <h3 className="font-semibold mt-4">🐛 Reporting Bugs</h3>
  <p className="text-gray-700">
    A <strong>bug</strong> is anything that does not work as expected — for example,
    a page not loading, a button not responding, or incorrect information showing.
    If you face any such issue, please let us know using one of the options below.
  </p>

  <ul className="list-disc ml-5 space-y-2 mt-2 text-gray-700">
    <li>
      <strong>GitHub Issues (Recommended):</strong>
      <br />
      This is the fastest way for our developers to track and fix problems.
      If you are familiar with GitHub, please report the issue here:
      <br />
      <a
        href="https://github.com/GEC-SKP-DEV/gecian_hub/issues"
        target="_blank"
        className="text-blue-600 underline"
      >
        https://github.com/GEC-SKP-DEV/gecian_hub/issues
      </a>
    </li>

    <li>
      <strong>Google Bug Reporting Form:</strong>
      <br />
      If you are not comfortable using GitHub, you can easily report the issue
      using this simple Google Form. Just describe the problem in your own words.
      <br />
      <a
        href="https://forms.gle/dv8LoFovtdNQztjK6"
        target="_blank"
        className="text-blue-600 underline"
      >
        https://forms.gle/dv8LoFovtdNQztjK6
      </a>
      <p className="text-sm text-gray-600 mt-1">
        (This option is best for non-technical users.)
      </p>
    </li>
  </ul>

  {/* Feature Requests */}
  <h3 className="font-semibold mt-4">✨ Feature Requests & Suggestions</h3>
  <p className="text-gray-700">
    Have an idea that could make Gecian Hub better? Maybe a new feature,
    an improvement, or something you wish existed?
    We’d love to hear your suggestions.
  </p>

  <p className="text-gray-700">
    You can share your ideas or take part in discussions here:
  </p>

  <a
    href="https://github.com/orgs/GEC-SKP-DEV/discussions"
    target="_blank"
    className="text-blue-600 underline"
  >
    https://github.com/orgs/GEC-SKP-DEV/discussions
  </a>

  {/* Contributions */}
  <h3 className="font-semibold mt-4">🤝 Contributing to Gecian Hub</h3>
  <p className="text-gray-700">
    Gecian Hub is an open-source project, which means students and developers
    can help improve it. Even small contributions make a big difference.
  </p>

  <ul className="list-disc ml-5 space-y-2 mt-2 text-gray-700">
    <li>
      Developers can pick a <strong>“good first issue”</strong> from the repository
      to start contributing.
    </li>
    <li>
      You can also explore and contribute to other projects under the
      <strong> GEC-SKP-DEV</strong> organization.
    </li>
    <li>
      If you are unsure where to start, join GitHub Discussions and ask questions.
    </li>
  </ul>

  <p className="mt-3 text-sm text-gray-600">
    Open-source contributions help improve the platform for everyone and give you
    valuable real-world experience.
  </p>
</section>

</div>
  );
}
