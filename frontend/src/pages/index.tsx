import { Box } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Auth from "../components/Auth/Auth";
import Chat from "../components/Chat/Chat";
import { authOptions } from "./api/auth/[...nextauth]";

const Index = () => {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    if (typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(session));
    }
    document.dispatchEvent(event);
  };

  return (
    <Box>
      {session?.user.username ? (
        <Chat session={session} />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: {
      session,
    },
  };
}

export default Index;
