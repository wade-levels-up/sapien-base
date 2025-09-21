import { format } from "date-fns";
import LikeButton from "@/app/ui/dashboard/LikeButton";
import DeletePostButton from "./DeletePostButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import type { PostAction, PostType } from "@/app/lib/definitions";

type PostProps = {
  postData: PostType;
  userId: string;
  isOptimistic?: boolean;
  setOptimisticPosts?: (action: PostAction) => void;
};

export default function Post({
  postData,
  userId,
  isOptimistic = false,
  setOptimisticPosts,
}: PostProps) {
  const { id, content, createdAt } = postData;
  const authorName = postData.author.firstName + " " + postData.author.lastName;
  const authorId = postData.author.id;

  const likesIdArray = postData.likes;
  const likeUserIds = likesIdArray.map((like) => like.userId);
  const userHasLiked = likeUserIds.includes(userId);

  const comments = postData.comments;

  return (
    <article className="flex w-full max-w-lg flex-col border-emerald-500/30 border rounded-sm p-2">
      <div className="flex justify-between bg-emerald-950 px-1 rounded-sm items-center">
        <h4>{authorName}</h4>
        <time dateTime={new Date(createdAt).toISOString()}>
          {format(new Date(createdAt), "d/M/yy")}
        </time>
      </div>
      <p className="grow bg-emerald-900 p-2">{content}</p>
      <div className="flex gap-2 items-center px-1 pt-1">
        <span title="Likes">
          <FontAwesomeIcon icon={faThumbsUp} /> {likesIdArray.length}
        </span>
        {comments.length > 0 && (
          <span title="Comments">
            <FontAwesomeIcon icon={faComment} /> {comments.length}
          </span>
        )}
      </div>
      <hr />
      <div className="flex w-full justify-between px-1">
        <LikeButton
          postId={id}
          userHasLiked={userHasLiked}
          isOptimistic={isOptimistic}
          setOptimisticPosts={setOptimisticPosts}
        />
        <Link href={`/dashboard/posts/${id}`}>
          <button disabled={isOptimistic}>Comments</button>
        </Link>
        {authorId === userId && (
          <DeletePostButton
            postId={id}
            userId={userId}
            setOptimisticPosts={setOptimisticPosts}
            isOptimistic={isOptimistic}
          />
        )}
      </div>
    </article>
  );
}
