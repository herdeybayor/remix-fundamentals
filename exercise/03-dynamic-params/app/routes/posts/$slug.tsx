import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/server-runtime";
import { marked } from "marked";

import { getPost } from "~/models/post.server";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;
  if (!slug) throw new Error("No slug provided");

  const post = await getPost(slug);

  if (!post) throw new Error("Post not found");

  const html = marked(post.markdown);
  return json({ post: { ...post, html } });
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>

      <div
        className="markdown"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex justify-center bg-red-100 pt-4 text-red-500">
        <div className="text-red-brand text-center">
          <div className="text-lg font-bold">Oh snap!</div>
          <div className="px-2 text-base">{error.message}</div>
        </div>
      </div>
    </div>
  );
}
