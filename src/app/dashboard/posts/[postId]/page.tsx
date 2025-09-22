import { fetchPost } from "@/app/lib/data";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import OptimisticComments from "@/app/ui/dashboard/OptimisticComments";
import OptimisticPosts from "@/app/ui/dashboard/OptimisticPosts";

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

    const authorName =
      postData.author.firstName + " " + postData.author.lastName;

    const comments = postData.comments;

    return (
      <>
        <h2 className="text-2xl mb-2">{`${authorName}'s Post`}</h2>
        <section className="flex w-full justify-center">
          <OptimisticPosts initialPosts={[postData]} currentUserId={user.id} />
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
        <hr />
      </>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }
}
