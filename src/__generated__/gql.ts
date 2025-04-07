/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n\t\tfragment CommentSection on IssueCommentConnection {\n\t\t\ttotalCount\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tbody\n\t\t\t\tcreatedAt\n\t\t\t\tauthor {\n\t\t\t\t\tavatarUrl(size: 40)\n\t\t\t\t\tlogin\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tpageInfo {\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t}\n\t": typeof types.CommentSectionFragmentDoc,
    "\n\tquery IssueDetailPage($number: Int!, $after: String) {\n\t\trepository(owner: \"facebook\", name: \"react\") {\n\t\t\tissue(number: $number) {\n\t\t\t\tid\n\t\t\t\t...IssueHeading\n\t\t\t\t...IssueDetailCard\n\t\t\t\tcomments(first: 3, after: $after) {\n\t\t\t\t\t...CommentSection\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n\t\n": typeof types.IssueDetailPageDocument,
    "\n\t\tfragment IssueDetailCard on Issue {\n\t\t\tbody\n\t\t\tcreatedAt\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t": typeof types.IssueDetailCardFragmentDoc,
    "\n\t\tfragment IssueHeading on Issue {\n\t\t\tnumber\n\t\t\ttitle\n\t\t\tstate\n\t\t}\n\t": typeof types.IssueHeadingFragmentDoc,
    "\n\t\tfragment IssueCard on Issue {\n\t\t\tid\n\t\t\ttitle\n\t\t\tnumber\n\t\t\tstate\n\t\t\tbodyText\n\t\t\tcreatedAt\n\t\t\tcomments {\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t\tlabels(first: 5) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": typeof types.IssueCardFragmentDoc,
    "\n\t\tfragment IssuePagination on PageInfo {\n\t\t\thasPreviousPage\n\t\t\thasNextPage\n\t\t\tstartCursor\n\t\t\tendCursor\n\t\t}\n\t": typeof types.IssuePaginationFragmentDoc,
};
const documents: Documents = {
    "\n\t\tfragment CommentSection on IssueCommentConnection {\n\t\t\ttotalCount\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tbody\n\t\t\t\tcreatedAt\n\t\t\t\tauthor {\n\t\t\t\t\tavatarUrl(size: 40)\n\t\t\t\t\tlogin\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tpageInfo {\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t}\n\t": types.CommentSectionFragmentDoc,
    "\n\tquery IssueDetailPage($number: Int!, $after: String) {\n\t\trepository(owner: \"facebook\", name: \"react\") {\n\t\t\tissue(number: $number) {\n\t\t\t\tid\n\t\t\t\t...IssueHeading\n\t\t\t\t...IssueDetailCard\n\t\t\t\tcomments(first: 3, after: $after) {\n\t\t\t\t\t...CommentSection\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n\t\n": types.IssueDetailPageDocument,
    "\n\t\tfragment IssueDetailCard on Issue {\n\t\t\tbody\n\t\t\tcreatedAt\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t": types.IssueDetailCardFragmentDoc,
    "\n\t\tfragment IssueHeading on Issue {\n\t\t\tnumber\n\t\t\ttitle\n\t\t\tstate\n\t\t}\n\t": types.IssueHeadingFragmentDoc,
    "\n\t\tfragment IssueCard on Issue {\n\t\t\tid\n\t\t\ttitle\n\t\t\tnumber\n\t\t\tstate\n\t\t\tbodyText\n\t\t\tcreatedAt\n\t\t\tcomments {\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t\tlabels(first: 5) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.IssueCardFragmentDoc,
    "\n\t\tfragment IssuePagination on PageInfo {\n\t\t\thasPreviousPage\n\t\t\thasNextPage\n\t\t\tstartCursor\n\t\t\tendCursor\n\t\t}\n\t": types.IssuePaginationFragmentDoc,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tfragment CommentSection on IssueCommentConnection {\n\t\t\ttotalCount\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tbody\n\t\t\t\tcreatedAt\n\t\t\t\tauthor {\n\t\t\t\t\tavatarUrl(size: 40)\n\t\t\t\t\tlogin\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tpageInfo {\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tfragment CommentSection on IssueCommentConnection {\n\t\t\ttotalCount\n\t\t\tnodes {\n\t\t\t\tid\n\t\t\t\tbody\n\t\t\t\tcreatedAt\n\t\t\t\tauthor {\n\t\t\t\t\tavatarUrl(size: 40)\n\t\t\t\t\tlogin\n\t\t\t\t\turl\n\t\t\t\t}\n\t\t\t}\n\t\t\tpageInfo {\n\t\t\t\tendCursor\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery IssueDetailPage($number: Int!, $after: String) {\n\t\trepository(owner: \"facebook\", name: \"react\") {\n\t\t\tissue(number: $number) {\n\t\t\t\tid\n\t\t\t\t...IssueHeading\n\t\t\t\t...IssueDetailCard\n\t\t\t\tcomments(first: 3, after: $after) {\n\t\t\t\t\t...CommentSection\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n\t\n"): (typeof documents)["\n\tquery IssueDetailPage($number: Int!, $after: String) {\n\t\trepository(owner: \"facebook\", name: \"react\") {\n\t\t\tissue(number: $number) {\n\t\t\t\tid\n\t\t\t\t...IssueHeading\n\t\t\t\t...IssueDetailCard\n\t\t\t\tcomments(first: 3, after: $after) {\n\t\t\t\t\t...CommentSection\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tfragment IssueDetailCard on Issue {\n\t\t\tbody\n\t\t\tcreatedAt\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tfragment IssueDetailCard on Issue {\n\t\t\tbody\n\t\t\tcreatedAt\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tfragment IssueHeading on Issue {\n\t\t\tnumber\n\t\t\ttitle\n\t\t\tstate\n\t\t}\n\t"): (typeof documents)["\n\t\tfragment IssueHeading on Issue {\n\t\t\tnumber\n\t\t\ttitle\n\t\t\tstate\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tfragment IssueCard on Issue {\n\t\t\tid\n\t\t\ttitle\n\t\t\tnumber\n\t\t\tstate\n\t\t\tbodyText\n\t\t\tcreatedAt\n\t\t\tcomments {\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t\tlabels(first: 5) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tfragment IssueCard on Issue {\n\t\t\tid\n\t\t\ttitle\n\t\t\tnumber\n\t\t\tstate\n\t\t\tbodyText\n\t\t\tcreatedAt\n\t\t\tcomments {\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t\tauthor {\n\t\t\t\tavatarUrl(size: 40)\n\t\t\t\tlogin\n\t\t\t\turl\n\t\t\t}\n\t\t\tlabels(first: 5) {\n\t\t\t\tnodes {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tcolor\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tfragment IssuePagination on PageInfo {\n\t\t\thasPreviousPage\n\t\t\thasNextPage\n\t\t\tstartCursor\n\t\t\tendCursor\n\t\t}\n\t"): (typeof documents)["\n\t\tfragment IssuePagination on PageInfo {\n\t\t\thasPreviousPage\n\t\t\thasNextPage\n\t\t\tstartCursor\n\t\t\tendCursor\n\t\t}\n\t"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;