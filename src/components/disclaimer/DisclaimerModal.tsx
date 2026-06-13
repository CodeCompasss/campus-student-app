"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasSeenDisclaimer, markDisclaimerAsSeen } from "@/lib/disclaimer/idb";
import { X } from "lucide-react";

export default function DisclaimerModal() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkDisclaimerStatus() {
      try {
        const seen = await hasSeenDisclaimer();
        setShowModal(!seen);
      } catch (error) {
        console.error("Error checking disclaimer:", error);
        // Show modal if there's an error (fail-safe)
        setShowModal(true);
      } finally {
        setIsLoading(false);
      }
    }

    checkDisclaimerStatus();
  }, []);

  const handleAccept = async () => {
    try {
      await markDisclaimerAsSeen();
      setShowModal(false);
    } catch (error) {
      console.error("Error marking disclaimer as seen:", error);
      // Still close the modal even if there's an error
      setShowModal(false);
    }
  };

  const handleViewTerms = () => {
    router.push("/sidebar/terms");
    setShowModal(false);
  };

  if (isLoading || !showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 p-4 pb-24 sm:pb-28">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Terms & Conditions
          </h2>
          <button
            onClick={handleAccept}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-gray-700">
          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Welcome to <strong>Gecian Hub</strong>. Please read and accept our Terms & Conditions to continue.
            </p>

            <section>
              <h3 className="font-semibold text-lg mb-2">1. Nature of the Platform</h3>
              <ul className="list-disc ml-6 space-y-1 text-sm">
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
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">2. No Institutional Responsibility</h3>
              <p className="text-sm">
                Colleges, departments, faculty, or administrative bodies have no legal, academic, or
                disciplinary responsibility for content or activity on this Platform.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">3. User Responsibility</h3>
              <ul className="list-disc ml-6 space-y-1 text-sm">
                <li>Users are responsible for content they upload and actions they take.</li>
                <li>Users must comply with applicable laws and college rules.</li>
                <li>Consequences arising from misuse (legal, academic, or disciplinary) are the User's responsibility.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">4. No Liability</h3>
              <p className="text-sm">
                To the maximum extent permitted by law, neither the Platform nor its contributors shall be liable for loss, damage, service interruptions, or other consequences arising from use.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">5. Acceptance</h3>
              <p className="text-sm">
                By using the Platform you accept these Terms and agree that developers, maintainers, and institutions bear no responsibility for your actions.
              </p>
            </section>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For the complete Terms & Conditions, Privacy Policy, and other legal documents, please visit our{" "}
                <button
                  onClick={handleViewTerms}
                  className="text-blue-600 underline hover:text-blue-800 font-semibold"
                >
                  Terms & Conditions page
                </button>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={handleViewTerms}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            View Full Terms
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
}


