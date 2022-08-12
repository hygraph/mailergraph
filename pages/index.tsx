import { gql } from "graphql-request";
import type { NextPage } from "next";
import Head from "next/head";
import Posts from "../components/Posts";
import styles from "../styles/Home.module.css";
import { hygraph } from "../utils/client";

const getAllCampaigns = gql`
    query getAllCampaigns {
        campaigns(stage: PUBLISHED, orderBy: createdAt_DESC) {
            id
            subject
            slug
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
    }
`;

export async function getServerSideProps(context: any) {
    const { campaigns } = await hygraph.request(getAllCampaigns);

    return {
        props: {
            campaigns,
        },
    };
}

const Home: NextPage = ({ campaigns }: any) => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.LIVE_URL);
    return (
        <div className={styles.container}>
            <Head>
                <title>MailerGraph</title>
                <meta name="description" content="MailerGraph" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Posts campaigns={campaigns} />
            </main>
        </div>
    );
};

export default Home;
