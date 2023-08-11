import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "X-bird",
    description: "Tweet with your GitHub account",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
