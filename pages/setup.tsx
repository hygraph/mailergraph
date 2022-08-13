import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack,
} from "@chakra-ui/react";
import { useApp, Wrapper } from "@graphcms/app-sdk-react";
import { useState } from "react";

function Install() {
    const { installation, updateInstallation } = useApp();
    const { config } = installation;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [host, setHost] = useState<any>(config.HOST || "");
    const [port, setPort] = useState<any>(config.PORT || "");
    const [user, setUser] = useState<any>(config.USER || "");
    const [pass, setPass] = useState<any>(config.PASS || "");
    const [emailFrom, setEmailFrom] = useState<any>(config.EMAIL_FROM || "");

    const isCompleted = installation.status === "COMPLETED";

    async function handleInstall(e: any) {
        e.preventDefault();
        setIsSubmitting(true);
        await updateInstallation({
            status: "COMPLETED",
            config: {
                HOST: host,
                PORT: port,
                USER: user,
                PASS: pass,
                EMAIL_FROM: emailFrom,
            },
        }).then(() => {
            setIsSubmitting(false);
        });
    }

    return (
        <Container maxW="100vw" bg="white">
            <Heading size="xl" mb={4}>
                MailerGraph Settings
            </Heading>
            <Box maxWidth="50vw">
                <form onSubmit={handleInstall}>
                    <Stack spacing={4}>
                        <FormControl isRequired>
                            <FormLabel>Host</FormLabel>
                            <Input
                                type="host"
                                placeholder="smtp.yourhost.com"
                                value={host}
                                onChange={(e: any) => setHost(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Port Number</FormLabel>
                            <Input
                                placeholder="Port Number"
                                value={port}
                                onChange={(e: any) => setPort(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                placeholder="Username"
                                value={user}
                                onChange={(e: any) => setUser(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                placeholder="Password"
                                value={pass}
                                onChange={(e: any) => setPass(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>E-mail From</FormLabel>
                            <Input
                                placeholder="E-mail From"
                                value={emailFrom}
                                onChange={(e: any) =>
                                    setEmailFrom(e.target.value)
                                }
                            />
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Save Settings
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Container>
    );
}

function Setup() {
    return (
        <Wrapper>
            <Install />
        </Wrapper>
    );
}

export default Setup;
