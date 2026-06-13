"use client";

import { GoogleAnalytics as GAComponent } from "nextjs-google-analytics";

export default function GoogleAnalytics() {
  return (
    <GAComponent
      trackPageViews
      gaMeasurementId="G-MY995PN0ND"
      debugMode={false}
    />
  );
}
