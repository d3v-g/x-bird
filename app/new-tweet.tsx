import { User } from "@supabase/auth-helpers-nextjs"

import Image from "next/image"
import FormClient from "./form-client"

export const dynamic = "force-dynamic"

export default function NewTweet({ user }: { user: User }) {
    return (
        <div className="flex py-6 px-8 border-b border-slate-300 dark:border-gray-800">
            <div className="w-9 h-9 sm:w-12 sm:h-12 flex-none">
                <Image
                    src={user.user_metadata.avatar_url}
                    alt="user avatar"
                    height={48}
                    width={48}
                    className="rounded-full"
                />
            </div>
            <FormClient />
        </div>
    )
}
