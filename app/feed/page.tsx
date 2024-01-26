import NewTweet from "@/components/feed/new-tweet"
import Tweets from "@/components/feed/tweets"
import AuthButtonServer from "@/components/shared/auth-button-server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import supabaseServer from "../supabaseServer"

export default async function Page() {
    const supabase = supabaseServer()
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { data } = await supabase
        .from("tweets")
        .select("*, author: profiles(*), likes(user_id)")
        .order("created_at", { ascending: false })

    const tweets =
        data?.map((tweet) => ({
            ...tweet,
            user_has_liked_tweet: !!tweet.likes.find(
                (like) => like.user_id === session?.user.id
            ),
            likes: tweet.likes.length,
            author: tweet.author!,
        })) ?? []

    if (!session) {
        redirect("/login")
    }
    return (
        <>
            <div className="flex justify-between px-10 pt-4">
                <h1 className="text-xl font-bold">Home</h1>
                <AuthButtonServer />
            </div>
            <NewTweet user={session.user} />
            <Tweets tweets={tweets} />
        </>
    )
}
