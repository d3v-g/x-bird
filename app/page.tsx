import { redirect } from "next/navigation"
import supabaseServer from "./supabaseServer"

export const dynamic = "force-dynamic"

export default async function Home() {
    const {
        data: { session },
    } = await supabaseServer().auth.getSession()

    if (!session) {
        redirect("/login")
    } else redirect("/feed")
}
