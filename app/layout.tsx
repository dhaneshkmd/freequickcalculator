export const metadata = { title: 'Free Quick Calculator — 30 Tools', description: 'Finance, Health & Utility calculators in one place.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen">{children}</body></html>);
}
