import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebRTC APP',
  description: 'Realtime chatting application which uses socket.io to establish Websocket connection and webrtc for video/audio streaming.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
