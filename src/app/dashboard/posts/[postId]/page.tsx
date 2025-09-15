import { fetchPost } from "@/app/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faComment } from "@fortawesome/free-solid-svg-icons";
import LikeButton from "@/app/ui/dashboard/LikeButton";
import OptimisticComments from "@/app/ui/dashboard/OptimisticComments";

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
    const authorName =
      postData.author.firstName + " " + postData.author.lastName;
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

        <OptimisticComments
          postId={postId}
          initialComments={comments}
          currentUser={{
            id: user.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            imageUrl: user.imageUrl,
          }}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
