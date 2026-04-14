export function PriceDisplay({ price }: { price: number }) {
  return (
    <div className="text-6xl md:text-8xl font-bold tracking-tighter text-[#1A1A1A] my-8 flex justify-center items-center font-mono">
      <span className="text-3xl md:text-5xl mr-2 text-[#0F7A73]">£</span>
      {price}
    </div>
  );
}
