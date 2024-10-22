import invariant from "tiny-invariant";

export function getEnv() {
  const { ADMIN_EMAIL } = process.env;
  invariant(ADMIN_EMAIL, "ADMIN_EMAIL is required");
  return {
    ADMIN_EMAIL,
  };
}

export type ENV = ReturnType<typeof getEnv>;

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
