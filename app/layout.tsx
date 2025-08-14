
export const metadata = { title: 'Free Quick Calculator', description: 'SIP, EMI, BMI calculators' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className="dark"><body className="min-h-screen">{children}</body></html>);
}
