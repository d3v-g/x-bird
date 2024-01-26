import { redirect } from "next/navigation"
import supabase from "./utils/supabaseServer"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export default async function Home() {
    const {
        data: { session },
    } = await supabase.auth.getSession()

    cookies().getAll()

    if (!session) {
        redirect("/login")
    } else redirect("/feed")
}
