export const metadata = {
  title: "myGENE — Huwag matakot sa inyong karapatan",
  description: "Filipino legal guide chat powered by Batasko. Deployed for DMCV Law × DMCV Advisory.",
  icons: {
    icon: [{ url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='80'%3E⚖%3C/text%3E%3C/svg%3E" }]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fdfaf3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#fdfaf3" }}>{children}</body>
    </html>
  );
}
