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
            <body>
                <div className="bg-slate-50 dark:bg-gray-900 min-h-screen flex">
                    {children}
                </div>
            </body>
        </html>
    )
}
