import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { config } from "../utils/config";

type formDataType = {
    email?: string;
    firstName?: string;
};

function SubscribeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [subscribed, setSubscribed] = useState(false);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData: formDataType = {
            email,
            firstName,
        };
        fetch(`${config.API_URL}/api/subscribe`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data?.response?.errors) {
                    alert(data.response.errors[0].message);
                } else {
                    setSubscribed(true);
                    alert("Thanks for subscribing!");
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <Box>
            <Heading size="3xl" mb={4}>
                Subscribe
            </Heading>
            <form onSubmit={handleOnSubmit}>
                <Stack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                        />
                        <FormHelperText>
                            We will never share your email.
                        </FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>First name</FormLabel>
                        <Input
                            placeholder="First name"
                            value={firstName}
                            onChange={(e: any) => setFirstName(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                    >
                        Subscribe Now
                    </Button>
                    <Link href="/" onClick={() => setSubscribed(true)}>
                        <a>Skip</a>
                    </Link>
                </Stack>
            </form>
        </Box>
    );
}

export default SubscribeForm;
