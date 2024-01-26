import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const cookieStore = cookies()
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore,
        })
        await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect(requestUrl.origin)
}
