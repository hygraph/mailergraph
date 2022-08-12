import { gql } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";
import { hygraph } from "../../utils/client";

const addSubscriber = gql`
    mutation createSubscriber($data: SubscriberCreateInput!) {
        createSubscriber(data: $data) {
            id
            email
            firstName
            isPaid
        }
    }
`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = req.body;
    if (data) {
        try {
            const { createSubscriber } = await hygraph.request(addSubscriber, {
                data,
            });
            res.status(200).json(createSubscriber);
        } catch (error) {
            res.status(400).json(error);
        }
    } else {
        res.status(200).json({ error: "Something went wrong!" });
    }
}
