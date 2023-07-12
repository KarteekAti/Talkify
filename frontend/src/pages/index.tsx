import { Box } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Auth from "../components/Auth/Auth";
import Chat from "../components/Chat/Chat";
import Cookies from "js-cookie";
import { authOptions } from "./api/auth/[...nextauth]";

const Index = () => {
  const { data: session } = useSession();

  if (typeof window !== "undefined") {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)__Secure-next-auth.session-token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log(token);
    localStorage.setItem("token", token);
  }

  const reloadSession = () => {
    const event = new Event("visibilitychange");
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
