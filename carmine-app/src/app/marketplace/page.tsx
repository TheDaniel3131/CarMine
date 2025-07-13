import React, { Suspense } from "react";
import MarketplacePage from "@/components/marketplace/Marketplace"; // renamed for clarity

export default function Buy() {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<div></div>}>
        <MarketplacePage />
      </Suspense>
    </div>
  );
}
