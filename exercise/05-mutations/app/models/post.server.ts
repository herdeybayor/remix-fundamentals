import { prisma } from "~/db.server";

export async function getPostListItems() {
  return prisma.post.findMany({ select: { slug: true, title: true } });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  title: string,
  slug: string,
  markdown: string,
) {
  return prisma.post.create({ data: { title, slug, markdown } });
}
