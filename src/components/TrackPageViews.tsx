"use client";

// app/page.tsx
"use client";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Hi!</h1>
      <p className="text-gray-700 text-lg">
        Welcome to your Next.js app.
      </p>
    </div>
  );
}


// import { usePathname, useSearchParams } from "next/navigation";
// import { useEffect } from "react";

// export default function TrackPageViews() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (!window.gtag) return;

//     const url =
//       pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

//     window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
//       page_path: url,
//     });
//   }, [pathname, searchParams]);

//   return null;
// }
