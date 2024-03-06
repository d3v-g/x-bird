import supabaseServer from "../supabaseServer"
import { redirect } from "next/navigation"
import GithubButton from "@/components/login/github-button"

export const dynamic = "force-dynamic"

export default async function Login() {
    const {
        data: { session },
    } = await supabaseServer().auth.getSession()

    if (session) {
        redirect("/")
    }

    return (
        <div className="flex flex-col flex-1 justify-center items-center uppercase gap-6">
            <h1 className="font-bold text-2xl">Welcome to X-bird!</h1>
            <h2>Sign in below using your github account</h2>
            <GithubButton />
        </div>
    )
}
