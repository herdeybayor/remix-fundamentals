import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPostsListItems } from "~/models/post.server";

export async function loader() {
  const posts = await getPostsListItems();
  return json({ posts });
}

export default function Posts() {
  const { posts } = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
