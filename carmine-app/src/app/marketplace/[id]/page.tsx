"use client";

import CarDetailsPage from "@/components/marketplace/[id]/CarDetails";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function CarDetails({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CarDetailsPage />
    </div>
  );
}
