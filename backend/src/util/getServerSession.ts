import fetch from "node-fetch";

export const getServerSession = async (cookie: string) => {
  const res = await fetch(`${process.env.CLIENT_ORIGIN}/api/auth/session`, {
    headers: { cookie: cookie },
  });
  const session = await res.json();
  return session;
};
