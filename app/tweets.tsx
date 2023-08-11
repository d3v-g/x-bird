"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Likes from "./likes"
import { useEffect, experimental_useOptimistic as useOptimistic } from "react"
import { useRouter } from "next/navigation"

export default function Tweets({ tweets }: { tweets: TweetWithAuthor[] }) {
    const [optimisticTweets, addOptimisticTweet] = useOptimistic<
        TweetWithAuthor[],
        TweetWithAuthor
    >(tweets, (currentTweets, newTweet) => {
        const newTweets = [...currentTweets]
        const index = newTweets.findIndex((tweet) => tweet.id === newTweet.id)
        newTweets[index] = newTweet
        return newTweets
    })

    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        const channel = supabase
            .channel("realtime tweets")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "tweets",
                },
                () => {
                    router.refresh()
                }
            )
            .subscribe()
        return () => {
            supabase.removeChannel(channel)
        }
    }, [router, supabase])

    return optimisticTweets.map((tweet) => (
        <div key={tweet.id}>
            <p>
                {tweet.author.name} {tweet.author.username}
            </p>
            <p>{tweet.title}</p>
            <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
        </div>
    ))
}
