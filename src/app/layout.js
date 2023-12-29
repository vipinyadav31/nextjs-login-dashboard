import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zest HRM',
  description: 'creating login signup page and CURD',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
