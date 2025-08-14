import Container from "./Container";
export default function Footer(){
  return (
    <footer className="border-t bg-white">
      <Container>
        <div className="py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Free Quick Calculator. Built with Next.js + Tailwind.
        </div>
      </Container>
    </footer>
  );
}
