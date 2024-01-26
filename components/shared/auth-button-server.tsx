import AuthButtonClient from "./auth-button-client"
import supabaseServer from "@/app/supabaseServer"

export const dynamic = "force-dynamic"

export default async function AuthButtonServer() {
    const {
        data: { session },
    } = await supabaseServer().auth.getSession()

    return <AuthButtonClient session={session} />
}
