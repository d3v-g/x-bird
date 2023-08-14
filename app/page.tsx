import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AuthButtonServer from "./auth-button-server"
import { redirect } from "next/navigation"
import NewTweet from "./new-tweet"
import Tweets from "./tweets"

export const dynamic = "force-dynamic"

export default async function Home() {
    const supabase = createServerComponentClient<Database>({ cookies })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
        redirect("/login")
    }

    const { data } = await supabase
        .from("tweets")
        .select("*, author: profiles(*), likes(user_id)")
        .order("created_at", { ascending: false })

    const tweets =
        data?.map((tweet) => ({
            ...tweet,
            user_has_liked_tweet: !!tweet.likes.find(
                (like) => like.user_id === session.user.id
            ),
            likes: tweet.likes.length,
            author: tweet.author!,
        })) ?? []

    return (
        <div className="flex flex-col border-0 sm:border sm:max-w-xl w-full mx-auto">
            <div className="flex justify-between px-10 pt-4">
                <h1 className="text-xl font-bold">Home</h1>
                <AuthButtonServer />
            </div>
            <NewTweet user={session.user} />
            <Tweets tweets={tweets} />
        </div>
    )
}
