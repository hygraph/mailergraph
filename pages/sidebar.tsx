import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormHelperText } from "@chakra-ui/react";
import { useFormSidebarExtension, Wrapper } from "@graphcms/app-sdk-react";
import type { NextPage } from "next";
import { useState } from "react";

function SubmitButton() {
    const { entry, showToast } = useFormSidebarExtension();
    const [isLoading, setIsLoading] = useState(false);
    const [canSend, setCanSend] = useState(entry?.id ? false : true);

    async function handleSendNewsletter() {
        const userConfirm = confirm("Are you sure?");
        if (!userConfirm) return;
        setIsLoading(true);
        fetch("http://localhost:3001/api/sendEmail", {
            method: "POST",
            body: JSON.stringify({
                entryId: entry?.id,
                forceDeliver: true,
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.isSent) {
                    showToast({
                        title: "Success!",
                        description: "Campaign has been sent!",
                        variantColor: "success",
                    });
                    return;
                }
                throw new Error("Something went wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                showToast({
                    title: "Error",
                    description: error.message,
                    variantColor: "error",
                });
            });
    }

    return (
        <>
            <FormControl>
                <Button
                    onClick={handleSendNewsletter}
                    isLoading={isLoading}
                    isDisabled={canSend}
                    width="100%"
                    rightIcon={<ArrowForwardIcon />}
                >
                    Send Campaign
                </Button>
                {canSend ? (
                    <FormHelperText>
                        Before you can send a campaign, you must publish it.
                    </FormHelperText>
                ) : null}
            </FormControl>
        </>
    );
}

const Home: NextPage = () => {
    return (
        <Wrapper>
            <SubmitButton />
        </Wrapper>
    );
};

export default Home;
