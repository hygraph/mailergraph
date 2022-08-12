import { Badge, Box, FormControl, Switch } from "@chakra-ui/react";
import { useFieldExtension, Wrapper } from "@graphcms/app-sdk-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

function SwitchField() {
    const { value, onChange, isReadOnly, isTableCell } = useFieldExtension();
    const [isChecked, setIsChecked] = useState(value);

    function handleToggle(e: any) {
        setIsChecked(e.target.checked);
    }

    useEffect(() => {
        onChange(isChecked);
    }, [isChecked, onChange]);

    if (isTableCell) {
        return value ? (
            <Box p={8} bgColor="white">
                <Badge colorScheme="green">Yes</Badge>
            </Box>
        ) : (
            <Box p={8} bgColor="white">
                <Badge colorScheme="red">No</Badge>
            </Box>
        );
    }

    return (
        <FormControl display="flex">
            <Switch
                id="is-public"
                onChange={handleToggle}
                isChecked={isChecked}
                isReadOnly={isReadOnly}
                isDisabled={isReadOnly}
            />
        </FormControl>
    );
}

const Home: NextPage = () => {
    return (
        <Wrapper>
            <SwitchField />
        </Wrapper>
    );
};

export default Home;
