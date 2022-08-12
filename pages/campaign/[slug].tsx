import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import { gql } from "graphql-request";
import type { NextPage } from "next";
import Image from "next/image";
import { hygraph } from "../../utils/client";

const getCampaignBySlug = gql`
    query getCampaignBySlug($slug: String!) {
        campaign(stage: PUBLISHED, where: { slug: $slug }) {
            id
            subject
            header {
                id
                url
                width
                height
            }
            emailBody {
                html
            }
            isPublic
            isSent
            opens
        }
    }
`;

export async function getServerSideProps(context: any) {
    const { params } = context;
    const { campaign } = await hygraph.request(getCampaignBySlug, {
        slug: params.slug,
    });

    return {
        props: {
            campaign,
        },
    };
}

const Campaign: NextPage = ({ campaign }: any) => {
    const { subject, header, emailBody } = campaign;
    return (
        <Container maxW="3xl" py={8}>
            <Stack spacing={4}>
                <Heading>{subject}</Heading>
                <Box>
                    <Image
                        src={header.url}
                        width={header.width}
                        height={header.height}
                    />
                </Box>
                <Box>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: emailBody.html,
                        }}
                    />
                </Box>
            </Stack>
        </Container>
    );
};

export default Campaign;
