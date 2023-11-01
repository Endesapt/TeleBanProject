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
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type Conversation = {
  __typename?: 'Conversation';
  creator: User;
  id: Scalars['Int']['output'];
  isDM: Scalars['Boolean']['output'];
  participants: Array<User>;
  title: Scalars['String']['output'];
};

export type Message = {
  __typename?: 'Message';
  conversation: Conversation;
  conversationId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  messageText: Scalars['String']['output'];
  sender: User;
  senderId: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<User>;
  createConversation: Conversation;
  deleteConversation: Conversation;
  enterConversation?: Maybe<Conversation>;
  postMessage: Message;
};


export type MutationCreateConversationArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteConversationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEnterConversationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPostMessageArgs = {
  conversationId: Scalars['Int']['input'];
  message: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  conversations: Array<Conversation>;
  messages: Array<Message>;
  user?: Maybe<User>;
};


export type QueryMessagesArgs = {
  conversationId: Scalars['Int']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  onConversationNewMessage: Message;
};


export type SubscriptionOnConversationNewMessageArgs = {
  conversationId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  conversations: Array<Conversation>;
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  userName: Scalars['String']['output'];
};

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number } | null };


export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;