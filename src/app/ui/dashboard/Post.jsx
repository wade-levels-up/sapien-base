import { format } from "date-fns";

export default function Post({ postData }) {
    const { content, createdAt } = postData;
    const authorName = postData.author.firstName;
    return (
        <article className="w-sm border-emerald-500/30 border rounded-sm p-2">
            <div className="flex justify-between bg-emerald-950 px-1 rounded-sm">
                <h4>{authorName}</h4>
                <time dateTime={new Date(createdAt).toISOString()}>
                    {format(new Date(createdAt), "d/M/yy")}
                </time>
            </div>
            <p className="bg-emerald-900 p-1">{content}</p>
        </article>
    )
}