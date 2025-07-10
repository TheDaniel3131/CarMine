"use client";

import CarDetailsPage from "@/components/marketplace/[id]/CarDetails";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function CarDetails({ params }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <CarDetailsPage params={params} />
    </div>
  );
}
