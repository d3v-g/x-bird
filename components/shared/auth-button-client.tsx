"use client"

import { Session } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function AuthButtonClient({
    session,
}: {
    session: Session | null
}) {
    const supabase = createClientComponentClient()
    const router = useRouter()

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    return session ? (
        <>
            <button
                onClick={handleSignOut}
                className="text-xs text-inherit dark:text-gray-300 border dark:border-inherit border-slate-800 rounded px-2 h-8"
            >
                Logout
            </button>
        </>
    ) : (
        <button
            onClick={handleSignIn}
            className="text-xs text-inherit dark:text-gray-300 border dark:border-inherit border-slate-800 rounded px-2 h-8"
        >
            Login
        </button>
    )
}
