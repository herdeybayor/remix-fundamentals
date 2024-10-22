import { Outlet } from "@remix-run/react";
import { ErrorFallback } from "~/components";

export default function PostsRoute() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorFallback>{error.message}</ErrorFallback>;
}
