import type { AppProps } from "next/app";
import {
    ChakraProvider,
    withDefaultColorScheme,
    theme as baseTheme,
    extendTheme,
} from "@chakra-ui/react";

const theme = extendTheme(
    {
        colors: {
            primary: baseTheme.colors.purple,
        },
        styles: {
            global: {
                body: {
                    bg: "#f8f9fb",
                },
            },
        },
    },
    withDefaultColorScheme({ colorScheme: "purple" })
);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;
