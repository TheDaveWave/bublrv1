import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouteMatch } from "react-router-dom";

function PageDisplay() {

    const match = useRouteMatch();

    return (
        <Box>
            <Typography>
                Hi
            </Typography>
        </Box>
    );
}

export default PageDisplay;