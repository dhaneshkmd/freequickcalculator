// components/Footer.tsx (excerpt)
export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-gray-500">© {new Date().getFullYear()} Free Quick Calculator</p>
        <nav className="text-sm text-gray-600 flex flex-wrap gap-4">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
