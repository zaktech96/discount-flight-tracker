export function PriceDisplay({ price }: { price: number }) {
  return (
    <div className="flex items-baseline justify-center gap-1 my-6">
      <span className="text-3xl text-slate-500 font-medium">£</span>
      <span className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900">
        {price}
      </span>
    </div>
  );
}
