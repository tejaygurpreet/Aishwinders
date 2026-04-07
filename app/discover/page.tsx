import Link from "next/link";

export const metadata = {
  title: "Discover",
  description: "Explore Rooherb—coming soon.",
};

export default function DiscoverPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-[#f7f4ee] px-4 py-28 text-center">
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#4A7043]">
        Discover
      </p>
      <h1 className="font-display mt-4 text-3xl tracking-[-0.02em] text-[#1c2419]">
        Coming soon
      </h1>
      <p className="mt-4 max-w-md text-[0.98rem] text-[#3d463a]/85">
        Stories, sourcing, and sensory notes—this space is in gentle
        preparation.
      </p>
      <Link
        href="/"
        className="mt-10 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[#4A7043] underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </main>
  );
}
