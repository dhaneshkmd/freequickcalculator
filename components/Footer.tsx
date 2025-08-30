// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Free Quick Calculator
        </p>
        <nav className="text-sm flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
          <a href="/about" className="hover:underline focus:underline">About</a>
          <a href="/privacy" className="hover:underline focus:underline">Privacy</a>
          <a href="/terms" className="hover:underline focus:underline">Terms</a>
          <a href="/contact" className="hover:underline focus:underline">Contact</a>
          <a href="/faq" className="hover:underline focus:underline">FAQ</a>
        </nav>
      </div>
    </footer>
  );
}
