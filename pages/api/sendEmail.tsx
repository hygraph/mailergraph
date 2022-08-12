// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sendMail from "../../emails";
import { gql } from "graphql-request";
import WelcomeDemo from "../../emails/WelcomeDemo";
import { hygraph } from "../../utils/client";

type Data = {
    isSent?: boolean;
    error?: any;
};

const getCampaignById = gql`
    query getCampaignById($id: ID!) {
        campaign(stage: PUBLISHED, where: { id: $id }) {
            isPublic
            isSent
            opens
            subject
            emailBody {
                html
            }
            header {
                id
                url
            }
            id
        }
    }
`;

const getSubscribers = gql`
    query getSubscribers {
        subscribers {
            email
            firstName
        }
    }
`;

const updateCampaign = gql`
    mutation updateCampaign($isSent: Boolean!, $id: ID!) {
        updateCampaign(data: { isSent: $isSent }, where: { id: $id }) {
            id
            isSent
        }
        publishCampaign(to: PUBLISHED, where: { id: $id }) {
            id
        }
    }
`;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { entryId, forceDeliver } = req.body;

    try {
        const { campaign } = await hygraph.request(getCampaignById, {
            id: entryId,
        });

        const { subject, emailBody, header } = campaign;

        const { subscribers } = await hygraph.request(getSubscribers);

        const results: any[] = await Promise.all(
            subscribers.map(async (subscriber: any) => {
                return await sendMail({
                    subject: subject,
                    to: subscriber.email,
                    component: (
                        <WelcomeDemo
                            name={subscriber.firstName}
                            body={emailBody.html}
                            headerImage={header.url}
                        />
                    ),
                    forceDeliver,
                }).catch(() => {
                    res.status(200).json({ isSent: false });
                });
            })
        );

        // console.log("results:", results);

        try {
            await hygraph.request(updateCampaign, {
                isSent: true,
                id: entryId,
            });

            res.status(200).json({ isSent: true });
        } catch (error) {
            console.log(error);
            res.status(200).json({ isSent: false });
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({ isSent: false });
    }
}
