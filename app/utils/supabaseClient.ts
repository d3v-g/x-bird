import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabaseClient = createClientComponentClient<Database>()

export default supabaseClient
