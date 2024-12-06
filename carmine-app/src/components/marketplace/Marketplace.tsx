"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ShoppingCart, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Car {
  id: number;
  name: string;
  make?: string;
  model?: string;
  year?: number;
  trim?: string;
  engine?: string;
  body?: string;
}

export default function Marketplace() {
  const [makes, setMakes] = useState<Car[]>([]);
  const [models, setModels] = useState<Car[]>([]);
  const [trims, setTrims] = useState<Car[]>([]);
  const [engines, setEngines] = useState<Car[]>([]);
  const [bodies, setBodies] = useState<Car[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("");
  const [selectedBody, setSelectedBody] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMakes();
  }, []);

  useEffect(() => {
    if (selectedMake) fetchModels();
  }, [selectedMake]);

  useEffect(() => {
    if (selectedModel) {
      fetchTrims();
      fetchBodies();
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedTrim) fetchEngines();
  }, [selectedTrim]);

  useEffect(() => {
    fetchCars();
  }, [
    selectedMake,
    selectedModel,
    selectedTrim,
    selectedEngine,
    selectedBody,
    page,
    searchTerm,
  ]);

  const fetchMakes = async () => {
    try {
      setLoading(true);
      const years = ["2015", "2016", "2017", "2018", "2019", "2020"];
      const yearParams = years.map((year) => `year=${year}`).join("&");
      const response = await fetch(`/api/admin/cars/makes?${yearParams}`);
      if (!response.ok) {
        throw new Error("Failed to fetch makes");
      }
      const data = await response.json();
      setMakes(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load makes");
    } finally {
      setLoading(false);
    }
  };

  const fetchModels = async () => {
    try {
      setLoading(true);
      const years = ["2015", "2016", "2017", "2018", "2019", "2020"];
      const yearParams = years.map((year) => `year=${year}`).join("&");
      const response = await fetch(
        `/api/admin/cars/models?${yearParams}&make=${selectedMake}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }
      const data = await response.json();
      setModels(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load models");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrims = async () => {
    try {
      setLoading(true);
      const years = ["2015", "2016", "2017", "2018", "2019", "2020"];
      const yearParams = years.map((year) => `year=${year}`).join("&");
      const response = await fetch(
        `/api/admin/cars/trims?${yearParams}&make=${selectedMake}&model=${selectedModel}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trims");
      }
      const data = await response.json();
      setTrims(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load trims");
    } finally {
      setLoading(false);
    }
  };

  const fetchEngines = async () => {
    try {
      setLoading(true);
      const years = ["2015", "2016", "2017", "2018", "2019", "2020"];
      const yearParams = years.map((year) => `year=${year}`).join("&");
      const response = await fetch(
        `/api/admin/cars/engines?${yearParams}&make=${selectedMake}&model=${selectedModel}&trim=${selectedTrim}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch engines");
      }
      const data = await response.json();
      setEngines(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load engines");
    } finally {
      setLoading(false);
    }
  };

  const fetchBodies = async () => {
    try {
      setLoading(true);
      const years = ["2015", "2016", "2017", "2018", "2019", "2020"];
      const yearParams = years.map((year) => `year=${year}`).join("&");
      const response = await fetch(
        `/api/admin/cars/bodies?${yearParams}&make=${selectedMake}&model=${selectedModel}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bodies");
      }
      const data = await response.json();
      setBodies(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bodies");
    } finally {
      setLoading(false);
    }
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      const years = ["2015", "2016", "2017", "2018", "2019", "2020"];
      const yearParams = years.map((year) => `year=${year}`).join("&");
      let url = `/api/admin/cars/trims?${yearParams}&page=${page}&limit=9`;
      if (selectedMake) url += `&make=${selectedMake}`;
      if (selectedModel) url += `&model=${selectedModel}`;
      if (selectedTrim) url += `&trim=${selectedTrim}`;
      if (selectedEngine) url += `&engine=${selectedEngine}`;
      if (selectedBody) url += `&body=${selectedBody}`;
      if (searchTerm) url += `&search=${searchTerm}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await response.json();
      setCars((prevCars) =>
        page === 1 ? data.data : [...prevCars, ...data.data]
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchCars();
  };

  const clearSelection = (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter("");
    setPage(1);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Car Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div>
          <Label htmlFor="make" className="mb-2 block">
            Make
          </Label>
          <Select value={selectedMake} onValueChange={setSelectedMake}>
            <SelectTrigger id="make" className="w-full">
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">Any Make</SelectItem>
              {makes.map((make) => (
                <SelectItem key={make.id} value={make.name}>
                  {make.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedMake && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() => clearSelection(setSelectedMake)}
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>

        <div>
          <Label htmlFor="model" className="mb-2 block">
            Model
          </Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger id="model" className="w-full">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">Any Model</SelectItem>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.name}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedModel && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() => clearSelection(setSelectedModel)}
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>

        <div>
          <Label htmlFor="trim" className="mb-2 block">
            Trim
          </Label>
          <Select value={selectedTrim} onValueChange={setSelectedTrim}>
            <SelectTrigger id="trim" className="w-full">
              <SelectValue placeholder="Select Trim" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">Any Trim</SelectItem>
              {trims.map((trim) => (
                <SelectItem key={trim.id} value={trim.name}>
                  {trim.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedTrim && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() => clearSelection(setSelectedTrim)}
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>

        <div>
          <Label htmlFor="engine" className="mb-2 block">
            Engine
          </Label>
          <Select value={selectedEngine} onValueChange={setSelectedEngine}>
            <SelectTrigger id="engine" className="w-full">
              <SelectValue placeholder="Select Engine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">Any Engine</SelectItem>
              {engines.map((engine) => (
                <SelectItem key={engine.id} value={engine.name}>
                  {engine.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedEngine && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() => clearSelection(setSelectedEngine)}
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>

        <div>
          <Label htmlFor="body" className="mb-2 block">
            Body
          </Label>
          <Select value={selectedBody} onValueChange={setSelectedBody}>
            <SelectTrigger id="body" className="w-full">
              <SelectValue placeholder="Select Body" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-">Any Body</SelectItem>
              {bodies.map((body) => (
                <SelectItem key={body.id} value={body.name}>
                  {body.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedBody && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-1"
              onClick={() => clearSelection(setSelectedBody)}
            >
              <X className="w-4 h-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </div>

      <div className="mb-8">
        <Label htmlFor="search" className="mb-2 block">
          Search
        </Label>
        <div className="flex">
          <Input
            id="search"
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} disabled={loading} className="ml-2">
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            Search
          </Button>
        </div>
      </div>

      {error && <div className="text-red-500 text-center mb-8">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src={`/placeholder.svg?height=200&width=300`}
              alt={`${car.make} ${car.model}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                {car.make} {car.model} {car.year}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {car.trim} {car.engine} {car.body}
              </p>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
        </div>
      ) : (
        <div className="text-center">
          <Button
            size="lg"
            onClick={loadMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
