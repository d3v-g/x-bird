"use server"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"

export const addTweet = async (formData: FormData) => {
    const title = String(formData.get("title"))
    const supabase = createServerActionClient<Database>({ cookies })

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("No user found")
    }

    if (!title) {
        return { error: { message: "Please enter a title" } }
    }

    try {
        const { error } = await supabase
            .from("tweets")
            .insert({ title, user_id: user.id })
        if (error) throw new Error(error.message)
    } catch (error) {
        console.error(error)
    }
    revalidatePath("/")
}
