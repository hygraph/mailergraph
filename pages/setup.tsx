import { useApp, Wrapper } from "@graphcms/app-sdk-react";

function Install() {
    const { installation, updateInstallation } = useApp();

    async function handleInstall() {
        await updateInstallation({
            status: "COMPLETED",
            config: {},
        });
    }

    if (installation.status === "COMPLETED") {
        return <p>App is installed!</p>;
    }

    return <button onClick={handleInstall}>Install</button>;
}

function Setup() {
    return (
        <Wrapper>
            <h1>MailerGraph</h1>
            <Install />
        </Wrapper>
    );
}

export default Setup;
