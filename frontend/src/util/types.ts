import {
  CreateConversationResponse,
  CreateUsernameResponse,
} from "../gql/graphql";
import { User } from "next-auth";

export interface CreateUsernameData {
  createUsername: CreateUsernameResponse;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

export interface CreateConversationData {
  createConversation: CreateConversationResponse;
}
