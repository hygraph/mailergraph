import { Heading } from "@chakra-ui/react";
import Link from "next/link";

function Posts({ campaigns }: any) {
    return (
        <>
            <Heading>Latest Posts</Heading>
            <div>
                <ul
                    style={{
                        listStyle: "none",
                    }}
                >
                    {campaigns &&
                        campaigns.map((campaign: any) => {
                            const dt = new Date(campaign.updatedAt);
                            return (
                                <li key={campaign.id}>
                                    <span>{dt.toLocaleDateString()}</span>
                                    {` - `}
                                    <Link href={`/campaign/${campaign.slug}`}>
                                        <a
                                            style={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            {campaign.subject}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </>
    );
}

export default Posts;
