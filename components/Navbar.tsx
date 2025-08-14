import Link from "next/link";
import Container from "./Container";
export default function Navbar(){
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">Free <span className="text-blue-600">Quick</span> Calculator</Link>
          <div className="hidden sm:block text-sm text-gray-500">fast • clean • free</div>
        </div>
      </Container>
    </nav>
  );
}
