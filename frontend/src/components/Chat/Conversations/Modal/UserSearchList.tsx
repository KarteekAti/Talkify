import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { SearchedUser } from "../../../../util/types";

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void;
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant,
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex m={6} justify="center">
          <Text>No User Found</Text>
        </Flex>
      ) : (
        <Stack m={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              bg="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.300" }}
            >
              <Avatar src={user.image} referrerPolicy="no-referrer" />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAlpha.900">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  onClick={() => addParticipant(user)}
                >
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
