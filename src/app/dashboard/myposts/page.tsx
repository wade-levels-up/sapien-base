import CreatePostForm from "@/app/ui/dashboard/CreatePostForm";

export default function MyPosts() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="w-full text-center">My Posts</h2>
      <CreatePostForm />
    </section>
  );
}
