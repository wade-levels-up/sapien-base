import { fetchPost } from "@/app/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "@/app/ui/dashboard/LikeButton";
import CreateCommentForm from "@/app/ui/dashboard/CreateCommentForm";
import Image from "next/image";

type PostPageProps = {
  params: {
    postId: string;
  };
};

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;
  const user = await currentUser();
  if (!user) redirect("/");

  try {
    const postData = await fetchPost(postId);

    if (!postData) notFound();

    const { id, content, createdAt } = postData;
    const authorName = postData.author.firstName;
    const likesIdArray = postData.likes;
    const likeUserIds = likesIdArray.map(
      (like: { userId: string }) => like.userId
    );
    const userHasLiked = likeUserIds.includes(user?.id);
    const comments = postData.comments;

    return (
      <>
        <h2>{`${authorName}'s Post`}</h2>
        <section className="flex justify-center">
          <article className="flex h-content flex-col w-full max-w-2xl border-emerald-500/30 border rounded-sm p-2">
            <div className="flex justify-between bg-emerald-950 px-1 rounded-sm">
              <h3>{authorName}</h3>
              <time dateTime={new Date(createdAt).toISOString()}>
                {format(new Date(createdAt), "d/M/yy")}
              </time>
            </div>
            <p className="grow bg-emerald-900 p-1">{content}</p>
            <span className="flex w-full justify-between pt-4">
              <div className="flex gap-2 items-center">
                <span title="Likes">
                  <FontAwesomeIcon icon={faThumbsUp} /> {likesIdArray.length}
                </span>
                {comments.length > 0 && (
                  <span title="Comments">
                    <FontAwesomeIcon icon={faComment} /> {comments.length}
                  </span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <LikeButton postId={id} userHasLiked={userHasLiked} />
              </div>
            </span>
          </article>
        </section>

        <h4 className="text-2xl py-4">Write Comment</h4>
        <section className="flex justify-center w-full">
          <CreateCommentForm postId={postId} />
        </section>

        {comments.length > 0 && (
          <>
            {" "}
            <h5 className="text-2xl py-4">Comments</h5>
            <section>
              <ul className="flex flex-col items-center w-full gap-4">
                {comments.map((comment) => (
                  <li
                    className="flex flex-col items-start bg-emerald-950 w-full max-w-2xl"
                    key={comment.id}
                  >
                    <div className="flex justify-start gap-3 w-full px-1 items-center p-2">
                      <span className="w-[32px] h-[32px] relative rounded-full">
                        {comment.author.profilePicturePath ? (
                          <Image
                            src={comment.author.profilePicturePath}
                            alt={`${comment.author.firstName} ${comment.author.lastName}`}
                            fill
                            className="object-cover rounded-full"
                            sizes="32px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-400 rounded-full flex items-center justify-center text-xs">
                            {comment.author.firstName.charAt(0)}
                          </div>
                        )}
                      </span>
                      <span>
                        {comment.author.firstName} {comment.author.lastName}
                      </span>
                    </div>
                    <p className="bg-emerald-900 w-full text-left px-1">
                      {comment.content}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
