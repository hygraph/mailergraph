import {
    Container,
    Heading,
    Stack,
    Stat,
    StatGroup,
    StatLabel,
    StatNumber,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Image,
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    HStack,
} from "@chakra-ui/react";
import { Wrapper } from "@graphcms/app-sdk-react";
import { gql } from "graphql-request";
import type { NextPage } from "next";
import { hygraph } from "../utils/client";

const getAllCampaigns = gql`
    query getAllCampaigns {
        campaigns(stage: PUBLISHED, orderBy: createdAt_DESC) {
            id
            subject
            header {
                url(
                    transformation: {
                        image: {
                            resize: { height: 100, width: 100, fit: crop }
                        }
                    }
                )
            }
            isSent
            isPublic
            opens
            updatedAt
        }
        subscribers {
            id
            email
            isPaid
        }
    }
`;

export async function getServerSideProps(context: any) {
    const { campaigns, subscribers } = await hygraph.request(getAllCampaigns);

    return {
        props: {
            campaigns,
            subscribers,
        },
    };
}

function filterPaidSubscribers(subscribers: any) {
    const paidSubscribers = subscribers.filter((subscriber: any) => {
        return subscriber.isPaid;
    });
    return paidSubscribers;
}

function DashboardPage({ campaigns, subscribers }: any) {
    const paidSubscribers = filterPaidSubscribers(subscribers);
    return (
        <Container width="100%" maxWidth="100vw" px={8} py={8}>
            <Stack spacing={2}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">MailerGraph</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading size="xl">Dashboard</Heading>
                <StatGroup>
                    <HStack spacing={8} width="100vw" my={4}>
                        <Stat bgColor="white" padding={4} borderRadius={15}>
                            <StatLabel>Total Subscribers</StatLabel>
                            <StatNumber>{subscribers.length}</StatNumber>
                        </Stat>
                        <Stat bgColor="white" padding={4} borderRadius={15}>
                            <StatLabel>Paid Subscribers</StatLabel>
                            <StatNumber>{paidSubscribers.length}</StatNumber>
                        </Stat>
                        <Stat bgColor="white" padding={4} borderRadius={15}>
                            <StatLabel>Emails Sent</StatLabel>
                            <StatNumber>{campaigns.length}</StatNumber>
                        </Stat>
                    </HStack>
                </StatGroup>
                {campaigns.length > 0 && (
                    <>
                        <TableContainer bgColor="white" borderRadius={15}>
                            <Heading size="lg" px={4} py={4}>
                                Posts
                            </Heading>
                            <Table variant="simple" colorScheme="gray">
                                <Thead>
                                    <Tr>
                                        {/* <Th>ID</Th> */}
                                        <Th>Image</Th>
                                        <Th>Subject</Th>
                                        <Th>Opens</Th>
                                        <Th>Is Public?</Th>
                                        <Th>Is Sent?</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {campaigns.map(
                                        (campaign: any, index: number) => (
                                            <Tr key={campaign.id}>
                                                {/* <Td>{++index}</Td> */}
                                                <Td>
                                                    {campaign.header ? (
                                                        <Image
                                                            src={
                                                                campaign.header
                                                                    .url
                                                            }
                                                            width="100"
                                                            height="100"
                                                            alt={
                                                                campaign.subject
                                                            }
                                                        />
                                                    ) : (
                                                        <Image
                                                            src="https://via.placeholder.com/100?text=Image"
                                                            width="100"
                                                            height="100"
                                                            alt={
                                                                campaign.subject
                                                            }
                                                        />
                                                    )}
                                                </Td>
                                                <Td>{campaign.subject}</Td>
                                                <Td>{campaign.opens}</Td>
                                                <Td>
                                                    {campaign.isPublic ? (
                                                        <Badge colorScheme="green">
                                                            Yes
                                                        </Badge>
                                                    ) : (
                                                        <Badge colorScheme="red">
                                                            No
                                                        </Badge>
                                                    )}
                                                </Td>
                                                <Td>
                                                    {campaign.isSent ? (
                                                        <Badge colorScheme="green">
                                                            Yes
                                                        </Badge>
                                                    ) : (
                                                        <Badge colorScheme="red">
                                                            No
                                                        </Badge>
                                                    )}
                                                </Td>
                                            </Tr>
                                        )
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Stack>
        </Container>
    );
}

const Home: NextPage = ({ campaigns, subscribers }: any) => {
    return (
        <Wrapper>
            <DashboardPage campaigns={campaigns} subscribers={subscribers} />
        </Wrapper>
    );
};

export default Home;
