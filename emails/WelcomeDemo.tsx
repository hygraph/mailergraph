import { ReactElement } from "react";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
    Mjml,
    MjmlBody,
    MjmlSection,
    MjmlColumn,
    MjmlText,
    MjmlImage,
    MjmlSpacer,
} from "mjml-react";
import ButtonPrimary from "./components/ButtonPrimary";
import {
    leadingTight,
    leadingRelaxed,
    textBase,
    textXl,
} from "./components/theme";

const MyFirstEmail: React.FC<{
    name: string;
    body: string;
    headerImage?: string;
}> = ({ name, body, headerImage }) => (
    <Mjml>
        <Head />
        <MjmlBody width={600}>
            <Header big />
            <MjmlSection padding="0">
                {headerImage ? (
                    <MjmlColumn>
                        <MjmlImage
                            cssClass="hero"
                            padding="0 0 40px"
                            align="left"
                            src={headerImage}
                        />
                    </MjmlColumn>
                ) : (
                    <MjmlColumn>
                        <MjmlImage
                            cssClass="hero"
                            padding="0 0 40px"
                            align="left"
                            src="https://s3.amazonaws.com/lab.campsh.com/real%402x.jpg"
                        />
                    </MjmlColumn>
                )}
            </MjmlSection>
            <MjmlSection padding="0 24px 0" cssClass="smooth">
                <MjmlColumn>
                    <MjmlText
                        cssClass="paragraph"
                        padding="0"
                        fontSize={textXl}
                        lineHeight={leadingTight}
                    >
                        Hello, {name}!
                    </MjmlText>
                    <MjmlText
                        padding="24px 0 16px"
                        fontSize={textBase}
                        lineHeight={leadingRelaxed}
                        cssClass="paragraph"
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: body,
                            }}
                        />
                    </MjmlText>
                    <MjmlSpacer height="24px" />
                    <ButtonPrimary
                        link={"https://hygraph.com"}
                        uiText={"Read Full Announcement"}
                    />
                    <MjmlSpacer height="24px" />
                    <MjmlText
                        padding="16px 0 0"
                        fontSize={textBase}
                        lineHeight={leadingRelaxed}
                        cssClass="paragraph"
                    >
                        ♥,
                        <br />
                        MailerGraph Team
                    </MjmlText>
                </MjmlColumn>
            </MjmlSection>
            <Footer />
        </MjmlBody>
    </Mjml>
);

export default MyFirstEmail;
