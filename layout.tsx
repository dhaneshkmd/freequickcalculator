export const metadata = {
  title: 'Free Quick Calculator — Multi-tool calculators',
  description: 'SIP, EMI, BMI, Currency Converter, and GST/VAT calculators. Fast, free, and mobile-friendly.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
