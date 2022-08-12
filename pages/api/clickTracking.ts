import { gql } from "graphql-request";
import type { NextApiRequest, NextApiResponse } from "next";
import { hygraph } from "../../utils/client";

const addClick = gql`
    mutation addClick($id: ID!, $opens: Int) {
        updateCampaign(where: { id: $id }, data: { opens: $opens }) {
            id
            opens
        }
        publishCampaign(to: PUBLISHED, where: { id: $id }) {
            id
            opens
        }
    }
`;

const getCampaignOpens = gql`
    query getCampaignOpensById($id: ID!) {
        campaign(stage: PUBLISHED, where: { id: $id }) {
            id
            opens
        }
    }
`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    if (id) {
        const { campaign } = await hygraph.request(getCampaignOpens, {
            id,
        });

        const opens = parseInt(campaign.opens) + 1;

        const { publishCampaign } = await hygraph.request(addClick, {
            id,
            opens,
        });

        res.status(200).json(publishCampaign);
    } else {
        res.status(200).json({ error: "Campaign ID not found!" });
    }
}
