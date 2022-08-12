import { GraphQLClient } from "graphql-request";

const contentApi: string = process.env.HYGRAPH_ENDPOINT as string;
const token: string = process.env.HYGRAPH_API_TOKEN as string;

export const hygraph = new GraphQLClient(contentApi, {
    headers: {
        authorization: `Bearer ${token}`,
    },
});
