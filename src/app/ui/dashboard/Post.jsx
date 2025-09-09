import { format } from "date-fns";
import LikeButton from "@/app/ui/dashboard/LikeButton";

export default function Post({ postData, userId }) {
    const { id, content, createdAt } = postData;
    const authorName = postData.author.firstName;
    const likesIdArray = postData.likes;
    const likeUserIds = likesIdArray.map(like => like.userId);
    const userHasLiked = likeUserIds.includes(userId);

    return (
        <article className="flex flex-col w-sm border-emerald-500/30 border rounded-sm p-2">
            <div className="flex justify-between bg-emerald-950 px-1 rounded-sm">
                <h4>{authorName}</h4>
                <time dateTime={new Date(createdAt).toISOString()}>
                    {format(new Date(createdAt), "d/M/yy")}
                </time>
            </div>
            <p className="grow bg-emerald-900 p-1">{content}</p>
            <span className="flex w-full justify-between pt-2">
                <span>Likes {likesIdArray.length}</span>
                <LikeButton postId={id} userHasLiked={userHasLiked}/>
            </span>
        </article>
    );
}