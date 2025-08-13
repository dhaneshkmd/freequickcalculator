export const metadata = {
  title: 'Free Quick Calculator — 3 calculators starter',
  description: 'SIP, EMI, BMI calculators. Fast, free, and mobile-friendly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
