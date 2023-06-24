/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateConversationResponse = {
  __typename?: 'CreateConversationResponse';
  conversationId?: Maybe<Scalars['String']['output']>;
};

export type CreateUsernameResponse = {
  __typename?: 'CreateUsernameResponse';
  error?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation?: Maybe<CreateConversationResponse>;
  createUsername?: Maybe<CreateUsernameResponse>;
};


export type MutationCreateConversationArgs = {
  participantsIds: Array<Scalars['String']['input']>;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  searchUsers?: Maybe<Array<Maybe<User>>>;
};


export type QuerySearchUsersArgs = {
  username: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type MutationMutationVariables = Exact<{
  participantsIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type MutationMutation = { __typename?: 'Mutation', createConversation?: { __typename?: 'CreateConversationResponse', conversationId?: string | null } | null };

export type QueryQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', searchUsers?: Array<{ __typename?: 'User', id?: string | null, username?: string | null, image?: string | null } | null> | null };

export type CreateUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type CreateUsernameMutation = { __typename?: 'Mutation', createUsername?: { __typename?: 'CreateUsernameResponse', success?: boolean | null, error?: string | null } | null };


export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participantsIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createConversation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"participantsIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participantsIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversationId"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const CreateUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateUsernameMutation, CreateUsernameMutationVariables>;