export default function FeedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col border-0 sm:border sm:max-w-xl w-full mx-auto">
            {children}
        </section>
    )
}
