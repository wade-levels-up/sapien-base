import { format } from "date-fns";
import LikeButton from "@/app/ui/dashboard/LikeButton";

export default function Post({ postData }) {
    const { id, content, createdAt } = postData;
    const authorName = postData.author.firstName;
    return (
        <article className="flex flex-col w-sm border-emerald-500/30 border rounded-sm p-2">
            <div className="flex justify-between bg-emerald-950 px-1 rounded-sm">
                <h4>{authorName}</h4>
                <time dateTime={new Date(createdAt).toISOString()}>
                    {format(new Date(createdAt), "d/M/yy")}
                </time>
            </div>
            <p className="grow bg-emerald-900 p-1">{content}</p>
            <span className="flex w-full justify-end pt-2">
                <LikeButton postId={id} />
            </span>
        </article>
    );
}