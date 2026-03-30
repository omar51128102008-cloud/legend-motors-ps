"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { CarGridSkeleton } from "@/components/Skeletons";
import {
  cars,
  allMakes,
  allBodyTypes,
  allFuelTypes,
  allColors,
  allConditions,
} from "@/lib/cars";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  ChevronDown,
  RotateCcw,
  Car,
} from "lucide-react";
import type { Metadata } from "next";

const ITEMS_PER_PAGE = 12;

function InventoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // ─── Filter state ───
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);
  const [selectedMakes, setSelectedMakes] = useState<string[]>(
    searchParams.get("make") ? [searchParams.get("make")!] : [],
  );
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>(
    [],
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    searchParams.get("condition") ? [searchParams.get("condition")!] : [],
  );
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [yearMin, setYearMin] = useState(2015);
  const [yearMax, setYearMax] = useState(2025);
  const [mileageMax, setMileageMax] = useState(200000);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  // ─── Filter logic ───
  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.make.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.bodyType.toLowerCase().includes(q) ||
          c.fuel.toLowerCase().includes(q) ||
          c.color.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          String(c.year).includes(q) ||
          (q.includes("under") &&
            c.price <= parseInt(q.replace(/\D/g, "")) * 1000),
      );
    }

    // Price
    result = result.filter(
      (c) => c.price >= priceMin && c.price <= priceMax,
    );

    // Make
    if (selectedMakes.length > 0)
      result = result.filter((c) => selectedMakes.includes(c.make));

    // Body type
    if (selectedBodyTypes.length > 0)
      result = result.filter((c) => selectedBodyTypes.includes(c.bodyType));

    // Fuel
    if (selectedFuelTypes.length > 0)
      result = result.filter((c) => selectedFuelTypes.includes(c.fuel));

    // Transmission
    if (selectedTransmissions.length > 0)
      result = result.filter((c) =>
        selectedTransmissions.includes(c.transmission),
      );

    // Condition
    if (selectedConditions.length > 0)
      result = result.filter((c) => selectedConditions.includes(c.condition));

    // Color
    if (selectedColors.length > 0)
      result = result.filter((c) => selectedColors.includes(c.color));

    // Year
    result = result.filter((c) => c.year >= yearMin && c.year <= yearMax);

    // Mileage
    result = result.filter((c) => c.mileage <= mileageMax);

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        result.sort((a, b) => b.year - a.year);
        break;
      case "mileage-asc":
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime(),
        );
    }

    return result;
  }, [
    search, priceMin, priceMax, selectedMakes, selectedBodyTypes,
    selectedFuelTypes, selectedTransmissions, selectedConditions,
    selectedColors, yearMin, yearMax, mileageMax, sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page on filter change
  useEffect(() => setCurrentPage(1), [filteredCars.length]);

  const activeFilterCount = [
    selectedMakes.length > 0,
    selectedBodyTypes.length > 0,
    selectedFuelTypes.length > 0,
    selectedTransmissions.length > 0,
    selectedConditions.length > 0,
    selectedColors.length > 0,
    priceMin > 0 || priceMax < 100000,
    yearMin > 2015 || yearMax < 2025,
    mileageMax < 200000,
  ].filter(Boolean).length;

  const clearAll = () => {
    setSearch("");
    setPriceMin(0);
    setPriceMax(100000);
    setSelectedMakes([]);
    setSelectedBodyTypes([]);
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
    setSelectedConditions([]);
    setSelectedColors([]);
    setYearMin(2015);
    setYearMax(2025);
    setMileageMax(200000);
    setSortBy("newest");
  };

  const toggleArrayItem = (
    arr: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  const ChipFilter = ({
    label,
    items,
    selected,
    setter,
  }: {
    label: string;
    items: string[];
    selected: string[];
    setter: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <div>
      <h4 className="text-sm font-semibold text-surface-900 mb-2">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggleArrayItem(selected, setter, item)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selected.includes(item)
                ? "bg-brand-500 text-white"
                : "bg-surface-100 text-surface-600 hover:bg-surface-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  // ─── Sidebar filter content ───
  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-surface-900 mb-2">
          Price Range
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="number"
            value={priceMin}
            onChange={(e) => setPriceMin(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-surface-200 text-sm"
            placeholder="Min"
          />
          <span className="text-surface-400">–</span>
          <input
            type="number"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-surface-200 text-sm"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min={0}
          max={100000}
          step={1000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-surface-400 mt-1">
          <span>{formatPrice(priceMin)}</span>
          <span>{formatPrice(priceMax)}</span>
        </div>
      </div>

      <ChipFilter
        label="Make"
        items={allMakes}
        selected={selectedMakes}
        setter={setSelectedMakes}
      />

      <ChipFilter
        label="Body Type"
        items={allBodyTypes}
        selected={selectedBodyTypes}
        setter={setSelectedBodyTypes}
      />

      <ChipFilter
        label="Fuel Type"
        items={allFuelTypes}
        selected={selectedFuelTypes}
        setter={setSelectedFuelTypes}
      />

      <ChipFilter
        label="Transmission"
        items={["Automatic", "Manual"]}
        selected={selectedTransmissions}
        setter={setSelectedTransmissions}
      />

      <ChipFilter
        label="Condition"
        items={allConditions}
        selected={selectedConditions}
        setter={setSelectedConditions}
      />

      {/* Year Range */}
      <div>
        <h4 className="text-sm font-semibold text-surface-900 mb-2">Year</h4>
        <div className="flex items-center gap-2">
          <select
            value={yearMin}
            onChange={(e) => setYearMin(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-surface-200 text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => 2015 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <span className="text-surface-400">–</span>
          <select
            value={yearMax}
            onChange={(e) => setYearMax(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-surface-200 text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => 2015 + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mileage */}
      <div>
        <h4 className="text-sm font-semibold text-surface-900 mb-2">
          Max Mileage
        </h4>
        <input
          type="range"
          min={0}
          max={200000}
          step={5000}
          value={mileageMax}
          onChange={(e) => setMileageMax(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-surface-500 mt-1">
          Up to {mileageMax.toLocaleString()} mi
        </p>
      </div>

      <ChipFilter
        label="Color"
        items={allColors}
        selected={selectedColors}
        setter={setSelectedColors}
      />

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-50">
        {/* Page header */}
        <div className="bg-white border-b border-surface-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-4">
              Browse Our Inventory
            </h1>

            {/* Search bar + controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search make, model, keyword..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 bg-white text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-surface-100"
                  >
                    <X className="w-4 h-4 text-surface-400" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 border border-surface-200 rounded-xl text-sm font-medium hover:bg-surface-50 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 border border-surface-200 rounded-xl text-sm font-medium bg-white cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year-desc">Year: Newest</option>
                    <option value="mileage-asc">Mileage: Lowest</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
                </div>

                {/* Layout toggle */}
                <div className="hidden sm:flex border border-surface-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setLayout("grid")}
                    className={`p-3 ${layout === "grid" ? "bg-surface-100" : "hover:bg-surface-50"}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLayout("list")}
                    className={`p-3 ${layout === "list" ? "bg-surface-100" : "hover:bg-surface-50"}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Result count */}
            <p className="text-sm text-surface-500 mt-3">
              Showing{" "}
              <span className="font-semibold text-surface-700">
                {filteredCars.length}
              </span>{" "}
              vehicle{filteredCars.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-white border border-surface-200 rounded-2xl p-6 max-h-[calc(100vh-7rem)] overflow-y-auto">
                <h3 className="font-bold text-surface-900 mb-5 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-auto text-xs bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full">
                      {activeFilterCount} active
                    </span>
                  )}
                </h3>
                <FilterPanel />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {isLoading ? (
                <CarGridSkeleton count={6} />
              ) : paginatedCars.length === 0 ? (
                /* No results */
                <div className="text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-surface-400" />
                  </div>
                  <h3 className="text-lg font-bold text-surface-900 mb-2">
                    No vehicles found
                  </h3>
                  <p className="text-surface-500 mb-4 max-w-md mx-auto text-sm">
                    Try adjusting your filters or search term. We update our
                    inventory frequently — check back soon!
                  </p>
                  <button
                    onClick={clearAll}
                    className="px-6 py-2.5 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  {layout === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                      {paginatedCars.map((car) => (
                        <CarCard key={car.id} car={car} layout="grid" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {paginatedCars.map((car) => (
                        <CarCard key={car.id} car={car} layout="list" />
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-lg border border-surface-200 text-sm font-medium disabled:opacity-40 hover:bg-surface-50 transition-colors"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                              page === currentPage
                                ? "bg-brand-500 text-white"
                                : "border border-surface-200 hover:bg-surface-50"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-lg border border-surface-200 text-sm font-medium disabled:opacity-40 hover:bg-surface-50 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute inset-y-0 left-0 w-[320px] max-w-[85vw] bg-white shadow-2xl flex flex-col animate-slide-in-right">
              <div className="flex items-center justify-between p-4 border-b border-surface-100">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-lg hover:bg-surface-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterPanel />
              </div>
              <div className="p-4 border-t border-surface-100">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-3 bg-brand-500 text-white rounded-lg font-semibold"
                >
                  Show {filteredCars.length} Results
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function InventoryPage() {
  return (
    <Suspense fallback={
      <>
        <Header />
        <main className="min-h-screen bg-surface-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <CarGridSkeleton count={6} />
          </div>
        </main>
        <Footer />
      </>
    }>
      <InventoryContent />
    </Suspense>
  );
}
