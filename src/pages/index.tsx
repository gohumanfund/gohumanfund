import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome to{' '}
          <span className="text-[hsl(280,100%,70%)]">Go Human Fund</span>
        </h1>
        <p className="text-2xl text-center">
          We're a micro-seed fund investing in young innovators and
          entrepreneurs building useful stuff for humanity. 🚀
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/auth/signin"
          >
            <h3 className="text-2xl font-bold">Apply for Funding →</h3>
            <div className="text-lg">
              Have an innovative idea? Apply for micro-seed funding and
              mentorship.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/about"
          >
            <h3 className="text-2xl font-bold">Learn More →</h3>
            <div className="text-lg">
              Discover how we support young innovators and entrepreneurs in
              their journey.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
