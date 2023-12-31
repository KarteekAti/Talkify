import { Avatar, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { MessagePopulated } from "../../../../util/types";
import { formatRelative } from "date-fns";
import { enIN, enUS } from "date-fns/locale";

interface MessageItemProps {
  message: MessagePopulated;
  sentByMe: boolean;
}
const formatRelativeLocale = {
  lastWeek: "eeee 'at' p",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy",
};

const MessageItem: React.FC<MessageItemProps> = ({ message, sentByMe }) => {
  return (
    <Stack
      direction="row"
      p={4}
      spacing={4}
      _hover={{ bg: "whiteAlpha.200" }}
      wordBreak="break-word"
      justify={sentByMe ? "flex-end" : "flex-start"}
    >
      {!sentByMe && (
        <Flex align="flex-start">
          <>{console.log(message.sender.image)}</>
          <Avatar src={message.sender.image} referrerPolicy="no-referrer" />
        </Flex>
      )}
      <Stack spacing={1} width="100%">
        <Stack
          direction="row"
          align="center"
          justify={sentByMe ? "flex-end" : "flex-start"}
        >
          {!sentByMe && (
            <Text fontWeight={500} textAlign="left">
              {message.sender.username}
            </Text>
          )}
          <Text fontSize={14} color="whiteAlpha.700">
            {formatRelative(new Date(message.createdAt), new Date(), {
              locale: {
                ...enUS,
                formatRelative: (token) => formatRelativeLocale[token],
              },
            })}
          </Text>
        </Stack>
        <Flex justify={sentByMe ? "flex-end" : "flex-start"}>
          <Box
            bg={sentByMe ? "brand.100" : "#5c5c5c"}
            px={2}
            py={1}
            borderRadius={12}
            maxWidth="65%"
          >
            <Text>{message.body}</Text>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default MessageItem;
