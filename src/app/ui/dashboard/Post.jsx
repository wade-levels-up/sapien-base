import { format } from "date-fns";
import LikeButton from "@/app/ui/dashboard/LikeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";

export default function Post({ postData, userId }) {
    const { id, content, createdAt } = postData;
    const authorName = postData.author.firstName;

    const likesIdArray = postData.likes;
    const likeUserIds = likesIdArray.map(like => like.userId);
    const userHasLiked = likeUserIds.includes(userId);

    const comments = postData.comments;

    return (
        <article className="flex h-full flex-col w-md border-emerald-500/30 border rounded-sm p-2">
            <div className="flex justify-between bg-emerald-950 px-1 rounded-sm">
                <h4>{authorName}</h4>
                <time dateTime={new Date(createdAt).toISOString()}>
                    {format(new Date(createdAt), "d/M/yy")}
                </time>
            </div>
            <p className="grow bg-emerald-900 p-1">{content}</p>    
            <span className="flex w-full justify-between pt-4">
                <div className="flex gap-2 items-center">
                    <span title="Likes"><FontAwesomeIcon icon={faThumbsUp} /> {likesIdArray.length}</span>
                    {comments.length > 0 && <span title="Comments"><FontAwesomeIcon icon={faComment} /> {comments.length}</span>}
                </div>
                <div className="flex gap-2 items-center">
                    <button>Comments</button>
                    <LikeButton postId={id} userHasLiked={userHasLiked}/>
                </div>
            </span>
        </article>
    );
}