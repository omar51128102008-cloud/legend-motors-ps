export function CarCardSkeleton() {
  return (
    <div className="bg-white border border-surface-200 rounded-2xl overflow-hidden">
      <div className="aspect-[4/3] skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 skeleton" />
        <div className="flex gap-3">
          <div className="h-4 w-16 skeleton" />
          <div className="h-4 w-16 skeleton" />
          <div className="h-4 w-16 skeleton" />
        </div>
        <div className="pt-3 border-t border-surface-100 flex justify-between">
          <div className="h-6 w-24 skeleton" />
          <div className="h-4 w-16 skeleton" />
        </div>
      </div>
    </div>
  );
}

export function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function VDPSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="h-4 w-48 skeleton mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-3">
          <div className="aspect-[16/10] skeleton rounded-2xl" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-20 h-16 skeleton rounded-lg" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="h-8 w-3/4 skeleton" />
          <div className="h-10 w-40 skeleton" />
          <div className="h-4 w-full skeleton" />
          <div className="h-4 w-2/3 skeleton" />
        </div>
      </div>
    </div>
  );
}
