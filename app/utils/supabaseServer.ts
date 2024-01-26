import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

const supabaseServer = createServerComponentClient<Database>({ cookies })

export default supabaseServer
