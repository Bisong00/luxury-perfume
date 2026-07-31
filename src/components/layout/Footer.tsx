export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 text-center">
        <h2 className="text-2xl font-bold tracking-[0.3em]">
          LUXE
        </h2>

        <p className="mt-4 text-sm text-neutral-500">
          Luxury fragrances crafted by the world's finest perfume houses.
        </p>

        <p className="mt-8 text-xs text-neutral-400">
          © {new Date().getFullYear()} Luxe Perfume Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}