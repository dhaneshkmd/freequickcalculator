import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="py-6 flex flex-col items-center gap-2 text-sm text-gray-600 md:flex-row md:justify-between">
          <div>
            © {new Date().getFullYear()} Free Quick Calculator. Built with Next.js + Tailwind.
          </div>

          <nav className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
