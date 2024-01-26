import supabase from "../utils/supabaseServer"
import { redirect } from "next/navigation"
import GithubButton from "@/components/login/github-button"

export const dynamic = "force-dynamic"

export default async function Login() {
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
