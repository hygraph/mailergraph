import { GraphQLClient } from "graphql-request";

const contentApi: string = process.env.HYGRAPH_ENDPOINT!;

export const hygraph = new GraphQLClient(contentApi);
