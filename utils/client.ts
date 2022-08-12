import { GraphQLClient } from "graphql-request";

const contentApi: string = process.env.HYGRAPH_ENDPOINT!;
const token: string = process.env.HYGRAPH_API_TOKEN!;

export const hygraph = new GraphQLClient(contentApi, {
    headers: {
        authorization: `Bearer ${token}`,
    },
});
