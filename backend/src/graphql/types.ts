import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Conversation = {
  __typename?: 'Conversation';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  latestMessage?: Maybe<Message>;
  participants?: Maybe<Array<Maybe<Paricipant>>>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
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

export type Message = {
  __typename?: 'Message';
  body?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation?: Maybe<CreateConversationResponse>;
  createUsername?: Maybe<CreateUsernameResponse>;
  markConversationAsRead?: Maybe<Scalars['Boolean']['output']>;
  sendMessage?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateConversationArgs = {
  participantsIds: Array<Scalars['String']['input']>;
};


export type MutationCreateUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationMarkConversationAsReadArgs = {
  conversationId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  body: Scalars['String']['input'];
  conversationId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type Paricipant = {
  __typename?: 'Paricipant';
  hasSeenLatestMessage?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  conversations: Array<Conversation>;
  messages?: Maybe<Array<Maybe<Message>>>;
  searchUsers?: Maybe<Array<Maybe<SearchedUser>>>;
};


export type QueryMessagesArgs = {
  conversationId: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  username: Scalars['String']['input'];
};

export type SearchedUser = {
  __typename?: 'SearchedUser';
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  conversationCreated?: Maybe<Conversation>;
  messageSent?: Maybe<Message>;
};


export type SubscriptionMessageSentArgs = {
  conversationId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Conversation: ResolverTypeWrapper<Conversation>;
  CreateConversationResponse: ResolverTypeWrapper<CreateConversationResponse>;
  CreateUsernameResponse: ResolverTypeWrapper<CreateUsernameResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Paricipant: ResolverTypeWrapper<Paricipant>;
  Query: ResolverTypeWrapper<{}>;
  SearchedUser: ResolverTypeWrapper<SearchedUser>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Conversation: Conversation;
  CreateConversationResponse: CreateConversationResponse;
  CreateUsernameResponse: CreateUsernameResponse;
  Date: Scalars['Date']['output'];
  Message: Message;
  Mutation: {};
  Paricipant: Paricipant;
  Query: {};
  SearchedUser: SearchedUser;
  String: Scalars['String']['output'];
  Subscription: {};
  User: User;
};

export type ConversationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Conversation'] = ResolversParentTypes['Conversation']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latestMessage?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  participants?: Resolver<Maybe<Array<Maybe<ResolversTypes['Paricipant']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateConversationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateConversationResponse'] = ResolversParentTypes['CreateConversationResponse']> = {
  conversationId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUsernameResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUsernameResponse'] = ResolversParentTypes['CreateUsernameResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createConversation?: Resolver<Maybe<ResolversTypes['CreateConversationResponse']>, ParentType, ContextType, RequireFields<MutationCreateConversationArgs, 'participantsIds'>>;
  createUsername?: Resolver<Maybe<ResolversTypes['CreateUsernameResponse']>, ParentType, ContextType, RequireFields<MutationCreateUsernameArgs, 'username'>>;
  markConversationAsRead?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationMarkConversationAsReadArgs, 'conversationId' | 'userId'>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'body' | 'conversationId' | 'id' | 'senderId'>>;
};

export type ParicipantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Paricipant'] = ResolversParentTypes['Paricipant']> = {
  hasSeenLatestMessage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  conversations?: Resolver<Array<ResolversTypes['Conversation']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QueryMessagesArgs, 'conversationId'>>;
  searchUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['SearchedUser']>>>, ParentType, ContextType, RequireFields<QuerySearchUsersArgs, 'username'>>;
};

export type SearchedUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchedUser'] = ResolversParentTypes['SearchedUser']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  conversationCreated?: SubscriptionResolver<Maybe<ResolversTypes['Conversation']>, "conversationCreated", ParentType, ContextType>;
  messageSent?: SubscriptionResolver<Maybe<ResolversTypes['Message']>, "messageSent", ParentType, ContextType, RequireFields<SubscriptionMessageSentArgs, 'conversationId'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emailVerified?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Conversation?: ConversationResolvers<ContextType>;
  CreateConversationResponse?: CreateConversationResponseResolvers<ContextType>;
  CreateUsernameResponse?: CreateUsernameResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Paricipant?: ParicipantResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchedUser?: SearchedUserResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

