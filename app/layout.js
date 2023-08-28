import '../styles/globals.scss'
import { Poppins as poppins } from 'next/font/google'
import { Navigation } from '@/components/Navigation'

const font = poppins({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Visamalog',
  description: 'Portfolio created with ❤️ by Visama',
  generator: 'Next.js',
  applicationName: 'visamalog',
  referrer: 'origin-when-cross-origin',
  keywords: ['visama', 'portfolio', 'visamalog', 'developer'],
  authors: [{ name: 'Victor', url: 'https://www.linkedin.com/in/visamalog/' }],
  creator: 'Víctor Sánchez Martínez',
  publisher: 'Víctor Sánchez Martínez',
  twitter: {
    card: 'summary_large_image',
    title: 'Visamalog',
    description: 'Portfolio of Víctor Sánchez Martínez',
    creator: '@visama396',
    creatorId: '3317846446',
    images: ['https://nextjs.org/og.png']
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='de'>
      <head>
        <link rel='icon' href='/images/favicon2.png' />
      </head>
      <body className={font.variable}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
