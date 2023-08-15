import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default function NewTweet({ user }: { user: User }) {
    const addTweet = async (formData: FormData) => {
        "use server"
        const title = String(formData.get("title"))
        const supabase = createServerActionClient<Database>({ cookies })
        await supabase.from("tweets").insert({ title, user_id: user.id })
        revalidatePath("/")
    }

    return (
        <form
            action={addTweet}
            className="border-b border-slate-300 dark:border-gray-800"
        >
            <div className="flex py-6 px-8">
                <div className="w-9 h-9 sm:w-12 sm:h-12 flex-none">
                    <Image
                        src={user.user_metadata.avatar_url}
                        alt="user avatar"
                        height={48}
                        width={48}
                        className="rounded-full"
                    />
                </div>
                <input
                    name="title"
                    className="bg-inherit border rounded w-10 flex-auto ml-4 px-2 text-xl placeholder-gray-500"
                    placeholder="What is happening?!"
                />
            </div>
        </form>
    )
}
