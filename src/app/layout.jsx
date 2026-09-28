export const metadata = {
  title: 'Anime Promo Engine — End-to-End Autonomous Marketing Pipeline',
  description: 'AI-Powered Anime Discovery, 9:16 Reel Motion Studio, Asset Verification, Background Rendering Worker, Instagram Publisher & Real-Time Analytics.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;700;900&family=JetBrains+Mono:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
