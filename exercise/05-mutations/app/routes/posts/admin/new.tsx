import { Form, useActionData } from "@remix-run/react";
import { type ActionArgs, json, redirect } from "@remix-run/server-runtime";

import { createPost } from "~/models/post.server";

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = String(formData.get("title"));
  const slug = String(formData.get("slug"));
  const markdown = String(formData.get("markdown"));

  const errors: Record<string, string> = {};

  if (!title) {
    errors.title = "Title is required";
  }

  if (!slug) {
    errors.slug = "Slug is required";
  }

  if (!markdown) {
    errors.markdown = "Markdown is required";
  }

  if (Object.keys(errors).length > 0) {
    return json(errors as Record<"title" | "slug" | "markdown", string>, {
      status: 400,
    });
  }

  await createPost(title, slug, markdown);

  return redirect("/posts/admin");
}

export default function NewPost() {
  const errors = useActionData<typeof action>();
  return (
    <Form method="post">
      <p>
        <label>
          Post Title:{" "}
          <input type="text" name="title" className={inputClassName} />
          {errors?.title && <em className="text-red-500">{errors.title}</em>}
        </label>
      </p>
      <p>
        <label>
          Post Slug:{" "}
          <input type="text" name="slug" className={inputClassName} />
          {errors?.slug && <em className="text-red-500">{errors.slug}</em>}
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown: </label>
        <br />
        <textarea
          id="markdown"
          rows={8}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
        {errors?.markdown && (
          <em className="text-red-500">{errors.markdown}</em>
        )}
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
