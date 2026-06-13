// app/pwa-install/page.tsx
"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

export default function PWAInstallPage() {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-black">
      <div className="flex justify-start items-center mb-6">
        <button
          className="border text-black border-gray-400 rounded-full p-2"
          onClick={() => router.push("/home")}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">📦 How to Install Gecian Hub (PWA)</h1>

      <p className="mb-6">
        Gecian Hub works as a <strong>Progressive Web App (PWA)</strong>, meaning you can install it like a real app on
        your phone, tablet, or computer—without downloading from an app store.
      </p>

      <hr className="border-white/20 my-8" />

      {/* ANDROID */}
      <h2 className="text-2xl font-semibold mb-4">📱 1. Android (Chrome / Edge / Brave / Samsung Internet)</h2>

      <h3 className="text-lg font-medium mt-4 mb-2">Method A: From Browser</h3>
      <ol className="list-decimal ml-6 space-y-2 mb-4">
        <li>Open the website in your browser.</li>
        <li>Wait for it to fully load.</li>
        <li>You will see a popup: <strong>“Add to Home screen”</strong>.</li>
        <li>Tap <strong>Add to Home screen</strong>.</li>
        <li>Tap <strong>Install</strong>.</li>
      </ol>

      <h3 className="text-lg font-medium mt-4 mb-2">Method B: Manually</h3>
      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Tap the <strong>three dots menu (⋮)</strong>.</li>
        <li>Select <strong>Install App</strong> or <strong>Add to Home screen</strong>.</li>
        <li>Confirm <strong>Install</strong>.</li>
      </ol>

      <hr className="border-white/20 my-8" />

      {/* iOS */}
      <h2 className="text-2xl font-semibold mb-4">📱 2. iPhone & iPad (Safari Only)</h2>
      <p className="italic text-yellow-300 mb-4">
        ⚠️ PWAs on iOS must be installed using Safari.
      </p>

      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Open <strong>Safari</strong>.</li>
        <li>Visit the website.</li>
        <li>Tap the <strong>Share icon</strong> (square with ↑ arrow).</li>
        <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
        <li>Tap <strong>Add</strong>.</li>
      </ol>

      <hr className="border-white/20 my-8" />

      {/* Windows */}
      <h2 className="text-2xl font-semibold mb-4">💻 3. Windows Desktop (Chrome / Edge / Brave)</h2>

      <ol className="list-decimal ml-6 space-y-2 mb-4">
        <li>Open the website.</li>
        <li>Look at the address bar for an <strong>Install App icon</strong>.</li>
        <li>Click <strong>Install</strong>.</li>
      </ol>

      <h3 className="text-lg font-medium mt-4 mb-2">Alternate Method</h3>
      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Open menu (⋮).</li>
        <li>Click <strong>Install App</strong>.</li>
        <li>Confirm <strong>Install</strong>.</li>
      </ol>

      <p className="mb-6">The app will appear in Start Menu, Desktop, or Taskbar (if pinned).</p>

      <hr className="border-white/20 my-8" />

      {/* macOS */}
      <h2 className="text-2xl font-semibold mb-4">💻 4. macOS Desktop (Chrome / Edge)</h2>

      <p className="italic text-yellow-300 mb-4">
        ⚠️ Safari does not support installing PWAs.
      </p>

      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Open Chrome or Edge.</li>
        <li>Click the <strong>Install icon</strong> in the address bar.</li>
        <li>Click <strong>Install</strong>.</li>
      </ol>

      <p className="mb-6">
        The app will appear in your Applications folder and can be pinned to your Dock.
      </p>

      <hr className="border-white/20 my-8" />

      {/* Linux */}
      <h2 className="text-2xl font-semibold mb-4">🐧 5. Linux Desktop (Chrome / Edge / Brave)</h2>

      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Open the website.</li>
        <li>Click the <strong>Install App</strong> icon in the address bar.</li>
        <li>Click <strong>Install</strong>.</li>
      </ol>

      <p className="mb-6">It will appear in your applications list and launcher.</p>

      <hr className="border-white/20 my-8" />

      {/* Desktop manual shortcut */}
      <h2 className="text-2xl font-semibold mb-4">🖥️ 6. Desktop Shortcut Method (Manual)</h2>

      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Open browser menu (⋮).</li>
        <li>Go to <strong>More Tools → Create Shortcut</strong>.</li>
        <li>Enable <strong>Open as Window</strong>.</li>
        <li>Click <strong>Create</strong>.</li>
      </ol>

      <p className="mb-6">This behaves like a fully installed app.</p>

      <hr className="border-white/20 my-8" />

      {/* Updating */}
      <h2 className="text-2xl font-semibold mb-4">🔄 Updating the PWA</h2>

      <p className="mb-6">
        PWAs update automatically when you open the app or refresh the page.  
        If a new version is available, it will load instantly.
      </p>

      <hr className="border-white/20 my-8" />

      {/* Uninstall */}
      <h2 className="text-2xl font-semibold mb-4">🗑️ Uninstalling the PWA</h2>

      <h3 className="font-medium mt-2">Android / iOS</h3>
      <p className="ml-6 mb-4">Long-press the app icon → Remove App / Uninstall</p>

      <h3 className="font-medium mt-2">Windows / macOS / Linux</h3>
      <p className="ml-6 mb-6">
        Right-click the app icon → <strong>Uninstall</strong>  
        <br />
        or go to browser → <strong>Manage Apps</strong> → Uninstall
      </p>

      <hr className="border-white/20 my-8" />

      

      <div className="h-10" />
    </div>
  );
}
