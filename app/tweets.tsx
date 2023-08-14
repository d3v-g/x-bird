"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Likes from "./likes"
import { useEffect, experimental_useOptimistic as useOptimistic } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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
        <div
            key={tweet.id}
            className="flex border-b border-slate-300 dark:border-gray-800 px-8 py-4"
        >
            <div className="w-12 h-12">
                <Image
                    src={tweet.author.avatar_url}
                    alt="author avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                />
            </div>
            <div className="ml-6">
                <p>
                    <span className="font-bold">{tweet.author.name}</span>
                    <span className="text-sm ml-2">
                        {tweet.author.username}
                    </span>
                </p>
                <p>{tweet.title}</p>
                <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
            </div>
        </div>
    ))
}
