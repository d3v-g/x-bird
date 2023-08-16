"use client"

import { useRef, useState } from "react"
import { addTweet } from "@/app/actions"

export default function FormClient() {
    const [error, setError] = useState<{ message: string } | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const action = async (formData: FormData) => {
        const result = await addTweet(formData)
        if (result?.error) {
            setError(result?.error)
        } else {
            setError(null)
            formRef.current?.reset()
        }
    }

    return (
        <form
            action={action}
            className="flex flex-wrap px-4 my-auto flex-1 gap-5"
            ref={formRef}
        >
            <input
                name="title"
                className="h-16 bg-inherit border rounded flex-auto px-2 text-xl placeholder-gray-500"
                placeholder="What is happening?!"
            />
            <button
                type="submit"
                className="border rounded-xl w-20 mx-auto flex-1 py-2 px-4"
            >
                submit
            </button>
            {error && (
                <p role="alert" className="text-red-500">
                    {error.message}
                </p>
            )}
        </form>
    )
}
