import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import GithubButton from "./github-button"

export const dynamic = "force-dynamic"

export default async function Login() {
    const supabase = createServerComponentClient({ cookies })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (session) {
        redirect("/")
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <GithubButton />
        </div>
    )
}
