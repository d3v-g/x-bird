"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"

export default function GithubButton() {
    const supabase = createClientComponentClient()
    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }
    let isDarkMode
    if (window !== undefined) {
        isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    }

    return (
        <button
            onClick={handleSignIn}
            className="hover:bg-slate-200 dark:hover:bg-gray-600 hover:rounded-xl hover:p-4"
        >
            <Image
                src={isDarkMode ? "/github-mark-white.png" : "/github-mark.png"}
                alt="github logo"
                height={100}
                width={100}
            />
        </button>
    )
}
