import { useState } from "react";
import { Car, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CarRecord {
  id: string;
  model: string;
  type: "rental" | "purchase";
  date: string;
  price: number;
  status: "active" | "completed" | "upcoming";
}

const carRecords: CarRecord[] = [
  {
    id: "1",
    model: "Tesla Model 3",
    type: "rental",
    date: "2023-06-15",
    price: 150,
    status: "completed",
  },
  {
    id: "2",
    model: "Ford Mustang",
    type: "purchase",
    date: "2023-07-01",
    price: 45000,
    status: "active",
  },
  {
    id: "3",
    model: "Toyota Camry",
    type: "rental",
    date: "2023-08-10",
    price: 80,
    status: "upcoming",
  },
  {
    id: "4",
    model: "Honda Civic",
    type: "purchase",
    date: "2023-05-20",
    price: 25000,
    status: "active",
  },
];

export default function CarRecordTracker() {
  const [filter, setFilter] = useState<"all" | "rental" | "purchase">("all");

  const filteredRecords = carRecords.filter((record) =>
    filter === "all" ? true : record.type === filter
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Your Car Records</CardTitle>
          <Select
            onValueChange={(value: "all" | "rental" | "purchase") =>
              setFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="rental">Rentals</SelectItem>
              <SelectItem value="purchase">Purchases</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecords.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Car className="mr-2 h-4 w-4" />
                    {record.model}
                  </h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {record.date}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      {record.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </div>
                    <div>Type: {record.type}</div>
                    <div>Status: {record.status}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
