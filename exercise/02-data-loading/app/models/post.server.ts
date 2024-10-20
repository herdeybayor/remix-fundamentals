import { prisma } from "~/db.server";

export async function getPostsListItems() {
  return prisma.post.findMany({
    select: {
      title: true,
      slug: true,
    },
  });
}
